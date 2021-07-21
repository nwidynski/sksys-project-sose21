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
      const { orderBy, search } = req.query;

      const sortOrder = orderBy?.toString() === "asc" ? "asc" : "desc";

      const isIngredientSearch = search
        ?.toString()
        .includes("recipe-feature: ");

      const searchedIngredients =
        isIngredientSearch && search?.toString().split(" ");

      const meetups = await prisma.meetUp.findMany({
        ...(search && {
          where: {
            OR: [
              { recipeName: { contains: search.toString() } },
              { hostName: { contains: search.toString() } },
            ],
          },
        }),
        orderBy: {
          createdAt: sortOrder,
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

      let recipes = await prisma.recipe.findMany({
        where: {
          isPrivate: false,
          ...(search &&
            !isIngredientSearch && { name: { contains: search?.toString() } }),
        },
        orderBy: {
          createdAt: sortOrder,
        },
        include: { Ingredients: true },
      });

      if (searchedIngredients) {
        recipes = recipes.filter((recipe) =>
          recipe.Ingredients.find((ingredient) =>
            searchedIngredients.find(
              (searchedIngredient) => searchedIngredient === ingredient.name
            )
          )
        );
      }

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
