import { Types } from "mongoose";
import Job from "../models/Job.js";
import { body, param, validationResult } from "express-validator";
import { BadRequestError, NotFoundError } from "../errors/errors.js";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith("no job with id")) {
          throw new NotFoundError(errorMessages);
        }
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
  param("id").custom(async (id) => {
    const isValidId = Types.ObjectId.isValid(id);

    if (!isValidId) {
      throw new Error(`${id} is not valid mongodb id`);
    }

    const job = await Job.findById(id);

    if (!job) {
      throw new Error(`no job with id:${id}`);
    }
  }),
]);
