import express from "express";

import { isAuthenticated } from "@server/middleware/auth";
import { handleValidationResult } from "@server/middleware/validator";
import MeetupController from "@server/controller/meetup";

const router = express.Router();

router.use(express.json());

router.get("/", MeetupController.list);

router.post(
  "/",
  isAuthenticated,
  MeetupController.validateBodyCreate(),
  handleValidationResult,
  MeetupController.create
);

router.put(
  "/:id",
  isAuthenticated,
  MeetupController.validateParams(),
  MeetupController.validateBodyCreate(),
  handleValidationResult,
  MeetupController.edit
);

// router.delete(
//   "/:id",
//   isAuthenticated,
//   MeetupController.validateParams(),
//   handleValidationResult,
//   MeetupController.remove
// );

export default router;
