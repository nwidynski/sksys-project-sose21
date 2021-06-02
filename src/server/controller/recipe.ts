import { Request, Response, NextFunction } from "express";
import { body, param } from "express-validator";
import { Prisma, User } from "@prisma/client";

import prisma from "@server/common/services/prisma.service";
import { ValidationMessages } from "@server/common/enums/validationMessages.enum";

/**
 * Creates a new recipe for an existing user.
 *
 * @param User
 * @param name
 * @param rating
 * @return {*}
 */
const createRecipe = (
  user: User,
  name: string,
  rating: number = 0,
  isPrivate: boolean = true
) => {
  return Prisma.validator<Prisma.RecipeCreateInput>()({
    name,
    rating,
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
 * @param rating
 * @return {*}
 */
const updateRecipe = (
  name: string,
  rating: number = 0,
  isPrivate: boolean = true
) => {
  return Prisma.validator<Prisma.RecipeUpdateInput>()({
    name,
    rating,
    isPrivate,
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
        .isInt()
        .withMessage(ValidationMessages.WRONG_TYPE),
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
      body("rating", ValidationMessages.UNDEFINED)
        .exists()
        .isInt()
        .withMessage(ValidationMessages.WRONG_TYPE)
        .isInt({ min: 0, max: 5 })
        .withMessage(ValidationMessages.WRONG_VALUE),
      body("isPrivate", ValidationMessages.UNDEFINED)
        .exists()
        .isBoolean()
        .withMessage(ValidationMessages.WRONG_TYPE),
    ];
  };

  /**
   * List all todos
   * @return JSON Array
   */
  export const list = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = req.user;

      const recipes = await prisma.recipe.findMany({
        where: { OR: [{ User: user }, { isPrivate: false }] },
      });

      res.status(200).json(recipes);
    } catch (err) {
      return next(err);
    }
  };

  /**
   * Get a specified todo
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
      const { name, rating, isPrivate } = req.body;

      const recipe = await prisma.recipe.updateMany({
        where: {
          id,
          User: user,
        },
        data: updateRecipe(name, rating, isPrivate),
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
      const { name, rating, isPrivate } = req.body;

      const recipe = await prisma.recipe.create({
        data: createRecipe(user, name, rating, isPrivate),
      });

      res.status(200).json(recipe);
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
