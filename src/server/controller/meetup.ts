import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import { Prisma, User } from "@prisma/client";

import prisma from "@server/common/services/prisma.service";
import { ValidationMessages } from "@server/common/enums/validationMessages.enum";


/**
 * Creates a new meetup.
 *
 * @param hostId
 * @param date
 * @param place
 * @param recipeId
 * @param maxGuests
 * @return {*}
 */
const createMeetup = (
    host: User,
    date: string,
    place: string,
    recipeId: string,
    maxGuests: number
) => {
    return Prisma.validator<Prisma.MeetUpCreateInput>()({
        date,
        place,
        recipeId,
        maxGuests,
        host: {
            connect: host
        }
    });
};

/**
 * Creates a new meetup.
 *
 * @param hostId
 * @param date
 * @param place
 * @param recipeId
 * @param maxGuests
 * @return {*}
 */
const updateMeetUpGuests = (
    guests: User[]
) => {
    return Prisma.validator<Prisma.MeetUpUpdateInput>()({
        guests: {
            connect: guests
        }
    });
};


namespace MeetupController {
    /**
     * Validates body payload for create.
     */
    export const validateBodyCreate = () => {
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
                .withMessage(ValidationMessages.WRONG_VALUE)
        ];
    };


    /**
     * Creates a new meetup.
     */
    export const create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const host = req.user;
            const { date, place, recipeId, maxGuests } = req.body;

            const found = await prisma.recipe.findUnique({
                where: { id: recipeId }
            });

            if (found == null) {
                res.status(404).json("Recipe not found.");
            } else {
                await prisma.meetUp.create({
                    data: createMeetup(host, date, place, recipeId, maxGuests)
                });

                res.status(200).json();
            }
        } catch (err) {
            return next(err);
        }
    };

}

export default MeetupController;
