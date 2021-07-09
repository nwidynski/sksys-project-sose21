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
                where: { isPrivate: false  },
            });

            const feed = [...recipes, ...meetups];
            feed.sort((a, b) => Date.parse(b.createdAt as any) - Date.parse(a.createdAt as any));

            res.status(200).json(feed);
        } catch (err) {
            return next(err);
        }
    };
}

export default FeedController;
