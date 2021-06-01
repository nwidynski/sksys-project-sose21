import express from "express";
import cors from "cors";
import RecipeController from "@server/controller/recipe";
import passport from "passport";
import { isAuthenticated } from "@server/middleware/auth";
import { handleValidationResult } from "@server/middleware/validator";

const router = express.Router();

router.use(cors());
router.use(express.json());
router.use(isAuthenticated);

router.get("/", RecipeController.list);

router.post(
  "/",
  RecipeController.validateParams(),
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

router.delete(
  "/:id",
  RecipeController.validateParams(),
  handleValidationResult,
  RecipeController.remove
);

export default router;
