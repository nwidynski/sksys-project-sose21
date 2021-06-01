import "core-js/stable";
import "regenerator-runtime/runtime";

import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import bodyParser from "cookie-parser";
import passport from "passport";
import { User } from "@prisma/client";

import RecipeController from "@server/routes/recipe";
import prisma from "@server/common/services/prisma.service";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

const app = express();
const port = process.env.PORT || 80;

app.use(express.static("public"));
app.use(cookieParser());
app.use(bodyParser());
app.use(session({ secret: "keyboard cat" }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  const User = <User>user;
  done(null, User.id);
});

passport.deserializeUser((id: string | undefined, done) => {
  prisma.user.findUnique({ where: { id } }).then((user) => {
    done(null, user);
  });
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

app.use("/recipes", RecipeController);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
