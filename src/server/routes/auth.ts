import express from "express";
import passport from "passport";

import prisma from "@server/common/services/prisma.service";
import UserController from "@server/controller/recipe";
import { isAuthenticated } from "@server/middleware/auth";
import { handleValidationResult } from "@server/middleware/validator";

const router = express.Router();

router.use(express.json());

router.post(
  "/login",
  UserController.validateBody,
  handleValidationResult,
  passport.authenticate("local"),
  UserController.get
);

router.post(
  "/signup",
  UserController.validateBody,
  handleValidationResult,
  UserController.create
);

router.post(
  "/deleteMyProfile",
  isAuthenticated,
  UserController.validateBody,
  handleValidationResult,
  UserController.remove
);

router.get("/logout", isAuthenticated, (req, res) => {
  req.logOut();
  res.redirect(301, "http://localhost:8080/login");
});

export default router;
