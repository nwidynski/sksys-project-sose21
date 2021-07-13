import express from "express";
import cors from "cors";
import RecipeController from "@server/controller/recipe";
import passport from "passport";
import { isAuthenticated } from "@server/middleware/auth";
import { handleValidationResult } from "@server/middleware/validator";

const router = express.Router();

router.use(express.json());
router.use(isAuthenticated);

router.get("/", RecipeController.list);

router.post(
  "/",
  RecipeController.validateBody(),
  handleValidationResult,
  RecipeController.create
);

router.get(
  "/:id",
  RecipeController.validateParams(),
  handleValidationResult,
  RecipeController.get
);

router.put(
  "/:id",
  RecipeController.validateParams(),
  RecipeController.validateBody(),
  handleValidationResult,
  RecipeController.edit
);

router.put(
    "/:id/rate",
    RecipeController.validateParams(),
    RecipeController.validateBodyRate(),
    handleValidationResult,
    RecipeController.rate
);

router.put(
    "/:id/save",
    RecipeController.validateParams(),
    handleValidationResult,
    RecipeController.save
);

router.put(
    "/:id/remove",
    RecipeController.validateParams(),
    handleValidationResult,
    RecipeController.removeSaved
);

router.delete(
  "/:id",
  RecipeController.validateParams(),
  handleValidationResult,
  RecipeController.remove
);

export default router;
