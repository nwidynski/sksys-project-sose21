import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import { Prisma, User } from "@prisma/client";

import prisma from "@server/common/services/prisma.service";
import { ValidationMessages } from "@server/common/enums/validationMessages.enum";


/**
 * Creates a new meetup.
 *
 * @param hostName
 * @param host
 * @param date
 * @param place
 * @param recipeId
 * @param maxGuests
 * @return {*}
 */
const createMeetUp = (
    hostName: string,
    date: string,
    place: string,
    recipeId: string,
    maxGuests: number,
    host: User
) => {
    return Prisma.validator<Prisma.MeetUpCreateInput>()({
        hostName,
        date,
        place,
        recipeId,
        maxGuests,
        host: {
            connect: { id: host.id }
        }
    });
};

/**
 * Updates guests for a meetup.
 *
 * @param oldGuestIds
 * @param newGuestId
 * @return {*}
 */
const updateMeetUpGuests = (
    //oldGuestIds: User[],
    newGuestId: string
) => {
    return Prisma.validator<Prisma.MeetUpUpdateInput>()({
        guests: {
            //disconnect: oldGuestIds.map(guest => {return {id: guest.id};}),
            connect: { id: newGuestId }
            //newGuestIds.map(guest => {return {id: guest.id};})
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
                const meetUp = await prisma.meetUp.create({
                    data: createMeetUp(host.firstname + " " + host.surname, date, place, recipeId, maxGuests, host)
                });

                res.status(200).json(meetUp);
            }
        } catch (err) {
            return next(err);
        }
    };


    /**
     * Updates an existing meetup.
     */
    export const update = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const guest = req.user;
            const { id } = req.body;

            const found = await prisma.meetUp.findUnique({
                where: { id },
                include: { guests: true }
            });

            if (found == null) {
                res.status(404).json("MeetUp not found.");
            } else {
                const meetUp = await prisma.meetUp.update({
                    where: { id },
                    data: updateMeetUpGuests(guest.id)
                });

                res.status(200).json(meetUp);
            }
        } catch (err) {
            return next(err);
        }
    };


    export const list = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {

            const meetups = await prisma.meetUp.findMany({
                //where: { OR: [{ User: user }, { isPrivate: false }] },
            });

            res.status(200).json(meetups);
        } catch (err) {
            return next(err);
        }
    };

}

export default MeetupController;
