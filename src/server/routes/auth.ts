import express from "express";
import passport from "passport";

import { isAuthenticated } from "@server/middleware/auth";
import { handleValidationResult } from "@server/middleware/validator";
import UserController from "@server/controller/user";

const router = express.Router();

router.use(express.json());

router.post(
  "/signup",
  UserController.validateBodyCreate(),
  handleValidationResult,
  UserController.create
);

router.post(
  "/login",
  UserController.validateBody(),
  handleValidationResult,
  passport.authenticate("local"),
  UserController.get
);

router.get("/logout", isAuthenticated, (req, res) => {
  req.logOut();
  res.redirect(301, "http://localhost:8080/login");
});

export default router;
