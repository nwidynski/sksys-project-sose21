import express from "express";
import { isAuthenticated } from "@server/middleware/auth";
import { handleValidationResult } from "@server/middleware/validator";
import MeetupController from "@server/controller/meetup";

const router = express.Router();
router.use(express.json());
router.use(isAuthenticated);

router.post(
  "/",
  MeetupController.validateBody(),
  handleValidationResult,
  MeetupController.create
);

router.put(
  "/:id/addGuest",
  MeetupController.validateParams(),
  handleValidationResult,
  MeetupController.addGuest
);

router.put(
    "/:id/removeGuest",
    MeetupController.validateParams(),
    handleValidationResult,
    MeetupController.removeGuest
);

router.put(
    "/:id/update",
    MeetupController.validateParams(),
    MeetupController.validateBody(),
    handleValidationResult,
    MeetupController.update
);

router.get("/", MeetupController.list);

router.delete(
   "/:id",
   MeetupController.validateParams(),
   handleValidationResult,
   MeetupController.remove
);

export default router;
