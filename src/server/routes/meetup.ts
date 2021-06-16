import express from "express";

import MeetupController from "@server/controller/meetup";
import { isAuthenticated } from "@server/middleware/auth";
import { handleValidationResult } from "@server/middleware/validator";
import RecipeController from "@server/controller/recipe";

const router = express.Router();

router.use(express.json());

router.post(
    "/",
    isAuthenticated,
    MeetupController.validateBodyCreate(),
    handleValidationResult,
    MeetupController.create
);

router.get("/", MeetupController.list);

router.put(
    "/",
    isAuthenticated,
    //MeetupController.validateBodyCreate(),
    handleValidationResult,
    MeetupController.update
);


export default router;
