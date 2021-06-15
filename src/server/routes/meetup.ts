import express from "express";

import MeetupController from "@server/controller/meetup";
import { isAuthenticated } from "@server/middleware/auth";
import { handleValidationResult } from "@server/middleware/validator";

const router = express.Router();

router.use(express.json());

router.post(
    "/",
    isAuthenticated,
    MeetupController.validateBodyCreate(),
    handleValidationResult,
    MeetupController.create
);


export default router;
