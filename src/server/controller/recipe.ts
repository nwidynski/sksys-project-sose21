import { Request, Response, NextFunction } from "express";
import { body, param } from "express-validator";
import { Prisma, User } from "@prisma/client";

import prisma from "@server/common/services/prisma.service";
import { ValidationMessages } from "@server/common/enums/validationMessages.enum";

/**
 * Creates a new recipe for an existing user.
 *
 * @param user
 * @param name
 * @param isPrivate
 * @return {*}
 */
const createRecipe = (
  user: User,
  name: string,
  isPrivate: boolean = true
) => {
  return Prisma.validator<Prisma.RecipeCreateInput>()({
    name,
    isPrivate,
    User: {
      connect: {
        id: user.id,
      },
    },
  });
};

/**
 * Updates an existing recipe.
 *
 * @param name
 * @param isPrivate
 * @return {*}
 */
const updateRecipe = (
  name: string,
  isPrivate: boolean = true
) => {
  return Prisma.validator<Prisma.RecipeUpdateInput>()({
    name,
    isPrivate,
  });
};

/**
 * Saves the recipe to the user.
 *
 * @param user
 * @return {*}
 */
const saveRecipe = (
    user: User
) => {
  return Prisma.validator<Prisma.RecipeUpdateInput>()({
    userProfiles: {
      connect: { id: user.id },
    }
  });
};

/**
 * Removes the saved recipe from the user.
 *
 * @param user
 * @return {*}
 */
const removeSavedRecipe = (
    user: User
) => {
  return Prisma.validator<Prisma.RecipeUpdateInput>()({
    userProfiles: {
      disconnect: { id: user.id },
    }
  });
};

/**
 * Updates the rating of the recipe.
 *
 * @param rating
 * @param reviewer
 * @return {*}
 */
const rateRecipe = (
    rating: number,
    reviewer: User
) => {
  return Prisma.validator<Prisma.RecipeUpdateInput>()({
    rating,
    reviewers: {
      connect: { id: reviewer.id },
    }
  });
};

namespace RecipeController {
  /**
   * Validates path parameters for GET/PUT/DELETE - /recipes/{:id}
   */
  export const validateParams = () => {
    return [
      param("id", ValidationMessages.UNDEFINED)
        .exists()
        .isString()
        .withMessage(ValidationMessages.WRONG_TYPE)
        .isUUID()
        .withMessage(ValidationMessages.WRONG_FORMAT)
    ];
  };

  /**
   * Validates body payload for PUT/POST - /recipes/{:id}
   */
  export const validateBody = () => {
    return [
      body("name", ValidationMessages.UNDEFINED)
        .exists()
        .isString()
        .withMessage(ValidationMessages.WRONG_TYPE)
        .trim()
        .escape(),
      body("isPrivate", ValidationMessages.UNDEFINED)
        .exists()
        .isBoolean()
        .withMessage(ValidationMessages.WRONG_TYPE),
    ];
  };

  /**
   * Validates body payload for rating update.
   */
  export const validateBodyRate = () => {
    return [
      body("rating", ValidationMessages.UNDEFINED)
          .exists()
          .isInt()
          .withMessage(ValidationMessages.WRONG_TYPE)
          .isInt({ min: 0, max: 5 })
          .withMessage(ValidationMessages.WRONG_VALUE)
    ];
  };

  /**
   * Returns all public recipes.
   *
   * @return JSON Array
   */
  export const list = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const recipes = await prisma.recipe.findMany({
        where: { isPrivate: false }
      });

      res.status(200).json(recipes);
    } catch (err) {
      return next(err);
    }
  };

  /**
   * Gets a specified recipe
   * @return  JSON Object
   */
  export const get = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = req.user;
      const { id } = req.params;

      const recipe = await prisma.recipe.findMany({
        where: {
          OR: [
            { id, User: user },
            { id, isPrivate: false },
          ],
        },
      });

      res.status(200).json(recipe);
    } catch (err) {
      return next(err);
    }
  };

  /**
   * Updates a specified recipe
   * @return JSON Object
   */
  export const edit = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = req.user;
      const { id } = req.params;
      const { name, isPrivate } = req.body;

      const recipe = await prisma.recipe.updateMany({
        where: {
          id,
          User: user,
        },
        data: updateRecipe(name, isPrivate),
      });

      res.status(200).json(recipe);
    } catch (err) {
      return next(err);
    }
  };

  /**
   * Adds a new recipe
   * @return JSON Object
   */
  export const create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = req.user;
      const { name, isPrivate } = req.body;

      const recipe = await prisma.recipe.create({
        data: createRecipe(user, name, isPrivate),
      });

      res.status(200).json(recipe);
    } catch (err) {
      return next(err);
    }
  };

  /**
   * Saves a specified recipe to an existing user.
   *
   * @return JSON Object
   */
  export const save = async (
      req: Request,
      res: Response,
      next: NextFunction
  ) => {
    try {
      const user = req.user;
      const { id } = req.params;

      const recipe = await prisma.recipe.findUnique({
        where: { id },
      });

      if (recipe == null) {
        res.status(404).json("Recipe not found.");
      } else {
        await prisma.recipe.update({
          where: { id },
          data: saveRecipe(user),
        });

        res.status(200).json(recipe);
      }
    } catch (err) {
      return next(err);
    }
  };

  /**
   * Removes a specified saved recipe from an existing user.
   *
   * @return JSON Object
   */
  export const removeSaved = async (
      req: Request,
      res: Response,
      next: NextFunction
  ) => {
    try {
      const user = req.user;
      const { id } = req.params;

      const recipe = await prisma.recipe.findUnique({
        where: { id },
      });

      if (recipe == null) {
        res.status(404).json("Recipe not found.");
      } else {
        await prisma.recipe.update({
          where: { id },
          data: removeSavedRecipe(user),
        });

        res.status(200).json(recipe);
      }
    } catch (err) {
      return next(err);
    }
  };

  /**
   * Calculates and updates the rating of a specified recipe.
   *
   * @return JSON Object
   */
  export const rate = async (
      req: Request,
      res: Response,
      next: NextFunction
  ) => {
    try {
      const reviewer = req.user;
      const { id } = req.params;
      const { rating } = req.body;

      const recipe = await prisma.recipe.findUnique({
        where: { id },
        include: {
          reviewers: {
            select: { id: true },
          },
        },
      });

      if (recipe == null) {
        res.status(404).json("Recipe not found.");
      }
      else if (reviewer.id == recipe.userId) {
        res.status(403).json("You cannot rate your own recipe!")
      }
      else {
        let reviewers: Array<string> = [];
        recipe.reviewers.forEach(extractID);

        function extractID(reviewer: any) {
          for (let key in reviewer) {
            if (reviewer.hasOwnProperty(key)) {
              reviewers.push(reviewer[key]);
            }
          }
        }

        if (reviewers.includes(reviewer.id)) {
          res.status(403).json("You have already rated this recipe!");
        }
        else {
          const newRating = (recipe.rating * reviewers.length + rating) / (reviewers.length + 1);

          const rated = await prisma.recipe.update({
            where: { id },
            data: rateRecipe(parseFloat(newRating.toFixed(2)), reviewer),
          });

          res.status(200).json(rated);
        }
      }
    } catch (err) {
      return next(err);
    }
  };

  /**
   * Deletes a specified recipe
   * @return JSON Object
   */
  export const remove = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = req.user;
      const { id } = req.params;

      const recipe = await prisma.recipe.deleteMany({
        where: { id, User: user },
      });

      res.status(200).json(recipe);
    } catch (err) {
      return next(err);
    }
  };
}

export default RecipeController;
