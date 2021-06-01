import { Request, Response, NextFunction } from "express";

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("http://localhost:8080/login", 301);
  }
}
