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
  MeetupController.validateBody(),
  handleValidationResult,
  MeetupController.create
);

router.put(
  "/:id/addGuest",
  isAuthenticated,
  MeetupController.validateParams(),
  handleValidationResult,
  MeetupController.addGuest
);

router.put(
    "/:id/removeGuest",
    isAuthenticated,
    MeetupController.validateParams(),
    handleValidationResult,
    MeetupController.removeGuest
);

router.put(
    "/:id/update",
    isAuthenticated,
    MeetupController.validateParams(),
    MeetupController.validateBody(),
    handleValidationResult,
    MeetupController.update
);

router.delete(
   "/:id",
   isAuthenticated,
   MeetupController.validateParams(),
   handleValidationResult,
   MeetupController.remove
);

export default router;
