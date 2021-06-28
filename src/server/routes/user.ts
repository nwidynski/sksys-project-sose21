import express from "express";

import { isAuthenticated } from "@server/middleware/auth";
import { handleValidationResult } from "@server/middleware/validator";
import UserController from "@server/controller/user";

const router = express.Router();

router.use(express.json());

router.put(
  "/user/updateEmail",
  isAuthenticated,
  UserController.validateBody(),
  handleValidationResult,
  UserController.updateEmail
);

router.put(
  "/user/updatePassword",
  isAuthenticated,
  UserController.validateBodyUpdatePassword(),
  handleValidationResult,
  UserController.updatePassword
);

router.put(
  "/user/updateName",
  isAuthenticated,
  UserController.validateBodyUpdateName(),
  handleValidationResult,
  UserController.updateName
);

export default router;
