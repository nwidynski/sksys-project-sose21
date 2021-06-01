import express from "express";
import passport from "passport";

import prisma from "@server/common/services/prisma.service";

const router = express.Router();

router.use(express.json());

router.post("/login", passport.authenticate("local"), (req, res) => {
  const user = req.user;

  res.status(200).send({
    id: user.id,
    name: user.name,
    email: user.email,
  });
});

router.post("/signup", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await prisma.user.create({ data: { name, email, password } });

    res.status(200).send({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
