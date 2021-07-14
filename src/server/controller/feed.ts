import { Request, Response, NextFunction } from "express";

import prisma from "@server/common/services/prisma.service";

namespace FeedController {
    /**
     * Returns a list with all public recipes and all meetups.
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
                    createdAt: "desc",
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

            const recipes = await prisma.recipe.findMany({
                where: { isPrivate: false },
                orderBy: {
                    createdAt: "desc",
                },
            });

            let feed: Array<any> = [];
            feed.push(meetups);
            feed.push(recipes);

            res.status(200).json(feed);
        } catch (err) {
            return next(err);
        }
    };
}

export default FeedController;
