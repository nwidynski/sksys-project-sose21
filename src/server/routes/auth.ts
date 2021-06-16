import express from "express";
import passport from "passport";

import UserController from "@server/controller/auth";
import { isAuthenticated } from "@server/middleware/auth";
import { handleValidationResult } from "@server/middleware/validator";

const router = express.Router();

router.use(express.json());

router.post(
    "/user",
    UserController.validateBodyCreate(),
    handleValidationResult,
    UserController.create
);

router.post(
  "/auth/login",
  UserController.validateBody(),
  handleValidationResult,
  passport.authenticate("local"),
  UserController.get
);

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

router.delete(
  "/user",
  isAuthenticated,
  UserController.validateBodyDelete(),
  handleValidationResult,
  UserController.remove
);

router.get("/auth/logout", isAuthenticated, (req, res) => {
  req.logOut();
  res.redirect(301, "http://localhost:8080/login");
});

export default router;
