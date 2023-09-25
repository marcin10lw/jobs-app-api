import { Types } from "mongoose";
import { body, param, validationResult } from "express-validator";
import { BadRequestError } from "../errors/errors.js";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        throw new BadRequestError(errorMessages);
      }

      return next();
    },
  ];
};

export const validateJobInput = withValidationErrors([
  body("company")
    .trim()
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 2, max: 30 })
    .withMessage("company must be between 2 and 30 characters long"),

  body("position")
    .trim()
    .notEmpty()
    .withMessage("position is required")
    .isLength({ min: 1, max: 30 })
    .withMessage("position must be between 1 and 30 characters long"),

  body("jobLocation").trim().notEmpty().withMessage("job location is required"),

  body("jobStatus")
    .default(JOB_STATUS.PENDING)
    .isIn(Object.values(JOB_STATUS))
    .withMessage("invalid jobStatus value"),

  body("jobType")
    .default(JOB_TYPE.FULL_TIME)
    .isIn(Object.values(JOB_TYPE))
    .withMessage("invalid jobType value"),
]);

export const validateIdParam = withValidationErrors([
  param("id")
    .custom((value) => {
      return Types.ObjectId.isValid(value);
    })
    .withMessage("invalid mongodb id"),
]);
