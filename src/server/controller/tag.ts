import { Request, Response, NextFunction } from "express";
import { body, param } from "express-validator";
import { Prisma } from "@prisma/client";

import prisma from "@server/common/services/prisma.service";
import { ValidationMessages } from "@server/common/enums/validationMessages.enum";

/**
 * Creates a new tag.
 *
 * @param name
 * @return {*}
 */
const createTag = (name: string) => {
  return Prisma.validator<Prisma.TagCreateInput>()({
    name,
  });
};

/**
 * Updates an existing tag.
 *
 * @param name
 * @return {*}
 */
const updateTag = (name: string) => {
  return Prisma.validator<Prisma.RecipeUpdateInput>()({
    name,
  });
};

namespace TagController {
  /**
   * Validates path parameters for GET/PUT/DELETE - /tags/{:id}
   */
  export const validateParams = () => {
    return [
      param("id", ValidationMessages.UNDEFINED)
        .exists()
        .isString()
        .withMessage(ValidationMessages.WRONG_TYPE),
    ];
  };

  /**
   * Validates body payload for PUT/POST - /tags/{:id}
   */
  export const validateBody = () => {
    return [
      body("name", ValidationMessages.UNDEFINED)
        .exists()
        .isString()
        .withMessage(ValidationMessages.WRONG_TYPE)
        .trim()
        .escape(),
    ];
  };

  /**
   * List all tags
   * @return JSON Array
   */
  export const list = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const tags = await prisma.tag.findMany();

      res.status(200).json(tags);
    } catch (err) {
      return next(err);
    }
  };

  /**
   * Get a specified tag
   * @return  JSON Object
   */
  export const get = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;

      const tag = await prisma.tag.findFirst({
        where: {
          id,
        },
      });

      res.status(200).json(tag);
    } catch (err) {
      return next(err);
    }
  };

  /**
   * Updates a specified tag
   * @return JSON Object
   */
  export const edit = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const tag = await prisma.tag.update({
        where: {
          id,
        },
        data: updateTag(name),
      });

      res.status(200).json(tag);
    } catch (err) {
      return next(err);
    }
  };

  /**
   * Adds a new tag
   * @return JSON Object
   */
  export const create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { name } = req.body;

      const tag = await prisma.tag.create({
        data: createTag(name),
      });

      res.status(200).json(tag);
    } catch (err) {
      return next(err);
    }
  };

  /**
   * Deletes a specified tag
   * @return JSON Object
   */
  export const remove = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;

      const removed = await prisma.tag.delete({
        where: { id },
      });

      res.status(200).json(removed);
    } catch (err) {
      return next(err);
    }
  };
}

export default TagController;
