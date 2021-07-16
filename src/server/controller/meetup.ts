import { Request, Response, NextFunction } from "express";
import { body, param } from "express-validator";
import { Prisma, User } from "@prisma/client";

import prisma from "@server/common/services/prisma.service";
import { ValidationMessages } from "@server/common/enums/validationMessages.enum";


/**
 * Creates a new meetup.
 *
 * @param hostId
 * @param hostName
 * @param date
 * @param place
 * @param recipeId
 * @param recipeName
 * @param maxGuests
 * @return {*}
 */
const createMeetUp = (
    hostId: string,
    hostName: string,
    date: string,
    place: string,
    recipeId: string,
    recipeName: string,
    maxGuests: number
) => {
  return Prisma.validator<Prisma.MeetUpCreateInput>()({
    hostId,
    hostName,
    date,
    place,
    recipeId,
    recipeName,
    maxGuests
  });
};


/**
 * Adds guest to the meetup.
 *
 * @param guestsCount
 * @param guest
 * @return {*}
 */
const addMeetUpGuest = (
  guestsCount: number,
  guest: User
) => {
  return Prisma.validator<Prisma.MeetUpUpdateInput>()({
    guestsCount,
    guests: {
      connect: { id: guest.id },
    }
  });
};


/**
 * Removes guest from the meetup.
 *
 * @param guestsCount
 * @param guest
 * @return {*}
 */
const removeMeetUpGuest = (
    guestsCount: number,
    guest: User
) => {
  return Prisma.validator<Prisma.MeetUpUpdateInput>()({
    guestsCount,
    guests: {
      disconnect: { id: guest.id },
    }
  });
};


/**
 * Updates the meetup.
 *
 * @param date,
 * @param place,
 * @param recipeId,
 * @param recipeName,
 * @param maxGuests
 * @return {*}
 */
const updateMeetUp = (
    date: string,
    place: string,
    recipeId: string,
    recipeName: string,
    maxGuests: number
) => {
  return Prisma.validator<Prisma.MeetUpUpdateInput>()({
    date,
    place,
    recipeId,
    recipeName,
    maxGuests
  });
};


namespace MeetupController {
  /**
   * Validates path parameters for PUT/DELETE.
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
   * Validates body payload for create/update.
   */
  export const validateBody = () => {
    return [
      body("date", ValidationMessages.UNDEFINED)
        .exists()
        .isString()
        .withMessage(ValidationMessages.WRONG_TYPE)
        .isISO8601()
        .withMessage(ValidationMessages.WRONG_FORMAT),
      body("place", ValidationMessages.UNDEFINED)
        .exists()
        .isString()
        .withMessage(ValidationMessages.WRONG_TYPE),
      body("recipeId", ValidationMessages.UNDEFINED)
        .exists()
        .isString()
        .withMessage(ValidationMessages.WRONG_TYPE)
        .isUUID()
        .withMessage(ValidationMessages.WRONG_FORMAT),
      body("maxGuests", ValidationMessages.UNDEFINED)
        .exists()
        .isInt()
        .withMessage(ValidationMessages.WRONG_TYPE)
        .isInt({ min: 1 })
        .withMessage(ValidationMessages.WRONG_VALUE),
    ];
  };


  /**
   * Creates a new meetup.
   *
   * @return JSON Object
   */
  export const create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const host = req.user;
      const { date, place, recipeId, maxGuests } = req.body;

      const recipe = await prisma.recipe.findUnique({
        where: { id: recipeId },
      });

      if (recipe == null) {
        res.status(404).json("Recipe not found.");
      } else {
        const meetup = await prisma.meetUp.create({
          data: createMeetUp(
            host.id,
            host.firstname + " " + host.surname,
            date,
            place,
            recipeId,
            recipe.name,
            maxGuests
          ),
          include: { guests: true },
        });

        res.status(200).json(meetup);
      }
    } catch (err) {
      return next(err);
    }
  };


  /**
   * Adds a guest to a specified meetup.
   *
   * @return JSON Object
   */
  export const addGuest = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const guest = req.user;
      const { id } = req.params;

      const found = await prisma.meetUp.findUnique({
        where: { id },
        include: {
          guests: {
            select: { id: true },
          },
        },
      });

      if (found == null) {
        res.status(404).json("Meet up not found.");
      }
      else if (guest.id == found.hostId) {
        res.status(403).json("You are the host!");
      }
      else {
        let guests: Array<string> = [];
        found.guests.forEach(extractID);

        function extractID(guest: any) {
          for (let key in guest) {
            if (guest.hasOwnProperty(key)) {
              guests.push(guest[key]);
            }
          }
        }

        if (guests.includes(guest.id)) {
          res.status(403).json("You have already joined this meet up!");
        }
        else if (found.guestsCount == found.maxGuests) {
          res.status(403).json("Sorry, this meet up is full.");
        }
        else {
          const meetup = await prisma.meetUp.update({
            where: { id },
            data: addMeetUpGuest(found.guestsCount + 1, guest),
            include: {
              guests: {
                select: {
                  id: true,
                  firstname: true,
                  surname: true,
                },
              },
            },
          });

          res.status(200).json(meetup);
        }
      }
    } catch (err) {
      return next(err);
    }
  };


  /**
   * Removes a guest from a specified meetup.
   *
   * @return JSON Object
   */
  export const removeGuest = async (
      req: Request,
      res: Response,
      next: NextFunction
  ) => {
    try {
      const guest = req.user;
      const { id } = req.params;

      const found = await prisma.meetUp.findUnique({
        where: { id },
        include: {
          guests: {
            select: { id: true },
          },
        },
      });

      if (found == null) {
        res.status(404).json("Meet up not found.");
      }
      else if (guest.id == found.hostId) {
        res.status(403).json("You are the host!");
      }
      else {
        let guests: Array<string> = [];
        found.guests.forEach(extractID);

        function extractID(guest: any) {
          for (let key in guest) {
            if (guest.hasOwnProperty(key)) {
              guests.push(guest[key]);
            }
          }
        }

        if (!guests.includes(guest.id)) {
          res.status(403).json("You can't leave a meet up that you haven't joined in the first place!");
        }
        else {
          const meetup = await prisma.meetUp.update({
            where: { id },
            data: removeMeetUpGuest(found.guestsCount - 1, guest),
            include: {
              guests: {
                select: {
                  id: true,
                  firstname: true,
                  surname: true,
                },
              },
            },
          });

          res.status(200).json(meetup);
        }
      }
    } catch (err) {
      return next(err);
    }
  };


  /**
   * Updates a specified meetup.
   *
   * @return JSON Object
   */
  export const update = async (
      req: Request,
      res: Response,
      next: NextFunction
  ) => {
    try {
      const host = req.user;
      const { id } = req.params;
      const { date, place, recipeId, maxGuests } = req.body;

      const found = await prisma.meetUp.findUnique({
        where: { id },
      });

      if (found == null) {
        res.status(404).json("Meet up not found.");
      }
      else if (found.hostId != host.id) {
        res.status(403).json("You must be the host!");
      }
      else {
        const recipe = await prisma.recipe.findUnique({
          where: { id: recipeId },
        });

        if (recipe == null) {
          res.status(404).json("Recipe not found.");
        }
        else {
          const meetup = await prisma.meetUp.update({
            where: { id },
            data: updateMeetUp(date, place, recipeId, recipe.name, maxGuests),
            include: {
              guests: {
                select: {
                  id: true,
                  firstname: true,
                  surname: true,
                },
              },
            },
          });

          res.status(200).json(meetup);
        }
      }
    } catch (err) {
      return next(err);
    }
  };


  /**
   * Returns a list with all meetups.
   *
   * @return JSON Array
   */
  export const list = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const meetups = await prisma.meetUp.findMany({
        orderBy: {
          date: "asc",
        },
        include: {
          guests: {
            select: {
              id: true,
              firstname: true,
              surname: true,
            },
          },
        },
      });

      res.status(200).json(meetups);
    } catch (err) {
      return next(err);
    }
  };


  /**
   * Deletes a specified meetup.
   *
   * @return JSON Object
   */
   export const remove = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const host = req.user;
      const { id } = req.params;

      const found = await prisma.meetUp.findUnique({
        where: { id },
      });

      if (found == null) {
        res.status(404).json("Meet up not found.");
      }
      else if (host.id != found.hostId) {
        res.status(403).json("You must be the host!");
      }
      else {
        await prisma.meetUp.delete({
          where: { id },
        });

        res.status(200).json(found);
      }
    } catch (err) {
      return next(err);
    }
  };
}

export default MeetupController;
