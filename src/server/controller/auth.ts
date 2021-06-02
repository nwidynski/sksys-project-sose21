import { Request, Response, NextFunction } from "express";
import { body, param } from "express-validator";
import { Prisma, User } from "@prisma/client";

import prisma from "@server/common/services/prisma.service";
import { ValidationMessages } from "@server/common/enums/validationMessages.enum";

/**
 * Creates a new user.
 *
 * @param User
 * @param name
 * @param rating
 * @return {*}
 */
const createUser = (email: string, name: string, password: string) => {
  return Prisma.validator<Prisma.UserCreateInput>()({
    email,
    name,
    password,
  });
};

/**
 * Updates an existing user.
 *
 * @param name
 * @param rating
 * @return {*}
 */
const updateUser = (email?: string, name?: string, password?: string) => {
  return Prisma.validator<Prisma.UserUpdateInput>()({
    email,
    name,
    password,
  });
};

namespace UserController {
  /**
   * Validates body payload for login and signup
   */
  export const validateBody = () => {
    return [
      body("email", ValidationMessages.UNDEFINED)
        .exists()
        .isString()
        .withMessage(ValidationMessages.WRONG_TYPE)
        .isEmail()
        .withMessage(ValidationMessages.WRONG_VALUE),
      body("name", ValidationMessages.UNDEFINED)
        .exists()
        .isString()
        .withMessage(ValidationMessages.WRONG_TYPE),
      body("password", ValidationMessages.UNDEFINED)
        .exists()
        .isString()
        .withMessage(ValidationMessages.WRONG_TYPE)
        .isStrongPassword()
        .withMessage(ValidationMessages.WRONG_VALUE),
    ];
  };

  /**
   * Get the authenticated user
   * @return  JSON Object
   */
  export const get = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = req.user;

      const loggedIn = await prisma.user.findUnique({
        where: {
          id: user.id,
        },
      });

      res.status(200).json({
        id: loggedIn?.id,
        name: loggedIn?.name,
        email: loggedIn?.email,
        createdAt: loggedIn?.createdAt,
      });
    } catch (err) {
      return next(err);
    }
  };

  /**
   * Updates the authenticated user
   * @return JSON Object
   */
  export const edit = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = req.user;
      const { email, name, password } = req.body;

      const recipe = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: updateUser(email, name, password),
      });

      res.status(200).json(recipe);
    } catch (err) {
      return next(err);
    }
  };

  /**
   * Creates a new user
   * @return JSON Object
   */
  export const create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email, name, password } = req.body;

      const user = await prisma.user.create({
        data: createUser(email, name, password),
      });

      res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      });
    } catch (err) {
      return next(err);
    }
  };

  /**
   * Deletes the authenticated user
   * @return JSON Object
   */
  export const remove = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = req.user;

      const removed = await prisma.user.delete({
        where: { id: user.id },
      });

      //TODO: CASCADE down

      res.status(200).json({
        id: removed.id,
      });
    } catch (err) {
      return next(err);
    }
  };
}

export default UserController;
