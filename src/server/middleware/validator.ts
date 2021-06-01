import express from "express";
import { validationResult } from "express-validator";

/**
 * Handles result of validation chain
 */
export const handleValidationResult = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ errors: errors.array({ onlyFirstError: true }) });
  }

  next();
};
