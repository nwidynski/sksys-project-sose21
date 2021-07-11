import express from "express";
import { isAuthenticated } from "@server/middleware/auth";
import { handleValidationResult } from "@server/middleware/validator";
import UserController from "@server/controller/user";

const router = express.Router();
router.use(express.json());
router.use(isAuthenticated);

router.put(
  "/updateEmail",
  UserController.validateBody(),
  handleValidationResult,
  UserController.updateEmail
);

router.put(
  "/updatePassword",
  UserController.validateBodyUpdatePassword(),
  handleValidationResult,
  UserController.updatePassword
);

router.put(
  "/updateName",
  UserController.validateBodyUpdateName(),
  handleValidationResult,
  UserController.updateName
);

export default router;
