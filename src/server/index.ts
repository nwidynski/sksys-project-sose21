import "core-js/stable";
import "regenerator-runtime/runtime";

import cors from "cors";
import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "@prisma/client";

import AuthRouter from "@server/routes/auth";
import UserRouter from "@server/routes/user";
import RecipeRouter from "@server/routes/recipe";
import MeetupRouter from "@server/routes/meetup";
import TagRouter from "@server/routes/tag";
import FeedRouter from "@server/routes/feed";
import prisma from "@server/common/services/prisma.service";

const app = express();
const port = process.env.PORT || 3000;

passport.use(
  new LocalStrategy(
    { usernameField: "email", session: true },
    (email, password, done) => {
      prisma.user.findFirst({ where: { email, password } }).then((user) => {
        done(null, user);
      });
    }
  )
);

passport.serializeUser((user, done) => {
  const User = <User>user;
  done(null, User.id);
});

passport.deserializeUser((id: string | undefined, done) => {
  prisma.user.findUnique({ where: { id } }).then((user) => {
    done(null, user);
  });
});

app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(
  session({ secret: "keyboard cat", resave: false, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", AuthRouter);

app.use("/user", UserRouter);

app.use("/recipes", RecipeRouter);

app.use("/meetups", MeetupRouter);

app.use("/tags", TagRouter);

app.use("/feed", FeedRouter);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
