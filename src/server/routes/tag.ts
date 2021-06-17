import express from "express";

import { isAuthenticated } from "@server/middleware/auth";
import { handleValidationResult } from "@server/middleware/validator";
import TagController from "@server/controller/tag";

const router = express.Router();

router.use(express.json());

router.get("/", TagController.list);

router.post(
  "/",
  isAuthenticated,
  TagController.validateBody(),
  handleValidationResult,
  TagController.create
);

router.get(
  "/:id",
  isAuthenticated,
  TagController.validateParams(),
  handleValidationResult,
  TagController.get
);

router.put(
  "/:id",
  isAuthenticated,
  TagController.validateParams(),
  TagController.validateBody(),
  handleValidationResult,
  TagController.edit
);

export default router;
