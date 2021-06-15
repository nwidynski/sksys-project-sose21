import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import { Prisma } from "@prisma/client";

import prisma from "@server/common/services/prisma.service";
import { ValidationMessages } from "@server/common/enums/validationMessages.enum";

/**
 * Creates a new user.
 *
 * @param email
 * @param firstname
 * @param surname
 * @param password
 * @return {*}
 */
const createUser = (email: string, firstname: string, surname: string, password: string) => {
  return Prisma.validator<Prisma.UserCreateInput>()({
    email,
    firstname,
    surname,
    password,
  });
};

/**
 * Updates an existing user's email.
 *
 * @param email
 * @return {*}
 */
const updateUserEmail = (email?: string) => {
  return Prisma.validator<Prisma.UserUpdateInput>()({
    email
  });
};

/**
 * Updates an existing user's password.
 *
 * @param password
 * @return {*}
 */
const updateUserPassword = (password?: string) => {
  return Prisma.validator<Prisma.UserUpdateInput>()({
    password
  });
};

/**
 * Updates an existing user's name.
 *
 * @param firstname
 * @param surname
 * @return {*}
 */
const updateUserName = (firstname?: string, surname?: string) => {
  return Prisma.validator<Prisma.UserUpdateInput>()({
    firstname,
    surname
  });
};

namespace UserController {
  /**
   * Validates body payload for signup
   */
  export const validateBodyCreate = () => {
    return [
      body("email", ValidationMessages.UNDEFINED)
        .exists()
        .isString()
        .withMessage(ValidationMessages.WRONG_TYPE)
        .isEmail()
        .withMessage(ValidationMessages.WRONG_VALUE),
      body("firstname", ValidationMessages.UNDEFINED)
        .exists()
        .isString()
        .withMessage(ValidationMessages.WRONG_TYPE),
      body("surname", ValidationMessages.UNDEFINED)
          .exists()
          .isString()
          .withMessage(ValidationMessages.WRONG_TYPE),
      body("password", ValidationMessages.UNDEFINED)
        .exists()
        .isString()
        .withMessage(ValidationMessages.WRONG_TYPE)
        .isStrongPassword()
        .withMessage(ValidationMessages.WRONG_VALUE)
    ];
  };

  /**
   * Validates body payload for login/email update
   */
  export const validateBody = () => {
    return [
      body("email", ValidationMessages.UNDEFINED)
          .exists()
          .isString()
          .withMessage(ValidationMessages.WRONG_TYPE)
          .isEmail()
          .withMessage(ValidationMessages.WRONG_VALUE),
      body("password", ValidationMessages.UNDEFINED)
          .exists()
          .isString()
          .withMessage(ValidationMessages.WRONG_TYPE)
          .isStrongPassword()
          .withMessage(ValidationMessages.WRONG_VALUE)
    ];
  };

  /**
   * Validates body payload for password update
   */
  export const validateBodyUpdatePassword = () => {
    return [
      body("oldPassword", ValidationMessages.UNDEFINED)
          .exists()
          .isString()
          .withMessage(ValidationMessages.WRONG_TYPE)
          .isStrongPassword()
          .withMessage(ValidationMessages.WRONG_VALUE),
      body("newPassword", ValidationMessages.UNDEFINED)
          .exists()
          .isString()
          .withMessage(ValidationMessages.WRONG_TYPE)
          .isStrongPassword()
          .withMessage(ValidationMessages.WRONG_VALUE)
    ];
  };

  /**
   * Validates body payload for name update
   */
  export const validateBodyUpdateName = () => {
    return [
      body("firstname", ValidationMessages.UNDEFINED)
          .exists()
          .isString()
          .withMessage(ValidationMessages.WRONG_TYPE),
      body("surname", ValidationMessages.UNDEFINED)
          .exists()
          .isString()
          .withMessage(ValidationMessages.WRONG_TYPE)
    ];
  };

  /**
   * Validates body payload for user delete
   */
  export const validateBodyDelete = () => {
    return [
      body("password", ValidationMessages.UNDEFINED)
          .exists()
          .isString()
          .withMessage(ValidationMessages.WRONG_TYPE)
          .isStrongPassword()
          .withMessage(ValidationMessages.WRONG_VALUE)
    ];
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
      const { email, firstname, surname, password } = req.body;

      const user = await prisma.user.create({
        data: createUser(email, firstname, surname, password)
      });

      res.status(200).json({
        id: user.id,
        firstname: user.firstname,
        surname: user.surname,
        email: user.email,
        createdAt: user.createdAt,
      });
    } catch (err) {
      return next(err);
    }
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
        firstname: loggedIn?.firstname,
        surname: loggedIn?.surname,
        email: loggedIn?.email,
        createdAt: loggedIn?.createdAt,
      });
    } catch (err) {
      return next(err);
    }
  };

  /**
   * Updates the authenticated user's email
   * @return JSON Object
   */
  export const updateEmail = async (
      req: Request,
      res: Response,
      next: NextFunction
  ) => {
    try {
      const user = req.user;
      const { email, password } = req.body;

      const found = await prisma.user.findFirst({
        where: {
          id: user.id,
          password: password
        },
      });

      if (found == null) {
        res.status(403).json();
      } else {
        await prisma.user.update({
          where: {
            id: user.id
          },
          data: updateUserEmail(email)
        });

        res.status(200).json();
      }
    } catch (err) {
      return next(err);
    }
  };

  /**
   * Updates the authenticated user's password
   * @return JSON Object
   */
  export const updatePassword = async (
      req: Request,
      res: Response,
      next: NextFunction
  ) => {
    try {
      const user = req.user;
      const { oldPassword, newPassword } = req.body;

      const found = await prisma.user.findFirst({
        where: {
          id: user.id,
          password: oldPassword
        },
      });

      if (found == null) {
        res.status(403).json();
      } else {
        await prisma.user.update({
          where: {
            id: user.id
          },
          data: updateUserPassword(newPassword)
        });

        res.status(200).json();
      }
    } catch (err) {
      return next(err);
    }
  };

  /**
   * Updates the authenticated user's name
   * @return JSON Object
   */
  export const updateName = async (
      req: Request,
      res: Response,
      next: NextFunction
  ) => {
    try {
      const user = req.user;
      const { firstname, surname } = req.body;

      await prisma.user.update({
        where: {
          id: user.id
        },
        data: updateUserName(firstname, surname)
      });

      res.status(200).json();
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
      const { password } = req.body;

      const found = await prisma.user.findFirst({
        where: {
          id: user.id,
          password: password
        },
      });

      if (found == null) {
        res.status(403).json();
      } else {
        await prisma.user.delete({
          where: {
            id: user.id
          }
        });

        //TODO: CASCADE down

        res.status(200).json();
      }
    } catch (err) {
      return next(err);
    }
  };
}

export default UserController;
