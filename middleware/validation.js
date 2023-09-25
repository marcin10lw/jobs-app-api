import { Types } from "mongoose";
import Job from "../models/Job.js";
import { body, param, validationResult } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/errors.js";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import User from "../models/User.js";

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

        if (errorMessages[0].startsWith("not authorized")) {
          throw new UnauthorizedError(errorMessages);
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
  param("id").custom(async (id, { req }) => {
    const isValidId = Types.ObjectId.isValid(id);

    if (!isValidId) {
      throw new Error(`${id} is not valid mongodb id`);
    }

    const job = await Job.findById(id);

    if (!job) {
      throw new Error(`no job with id:${id}`);
    }
    const isAdmin = req.user.role === "admin";
    const isOwner = req.user.userId === job.createdBy.toString();

    if (!isOwner && !isAdmin) {
      throw new Error("not authorized to modify this resource");
    }
  }),
]);

export const validateRegister = withValidationErrors([
  body("name")
    .trim()
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 3, max: 30 })
    .withMessage("name must be between 3 and 30 characters long"),

  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("last name is required")
    .isLength({ min: 2, max: 30 })
    .withMessage("last name must be between 2 and 30 characters long"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email")
    .custom(async (email) => {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        throw new Error("this email is already in use");
      }
    }),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters long"),

  body("location").trim().notEmpty().withMessage("location is required"),
]);

export const validateLogin = withValidationErrors([
  body("email")
    .trim()
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email"),

  body("password").trim().notEmpty().withMessage("password is required"),
]);

export const validateUpdateUser = withValidationErrors([
  body("name")
    .trim()
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 3, max: 30 })
    .withMessage("name must be between 3 and 30 characters long"),

  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("last name is required")
    .isLength({ min: 2, max: 30 })
    .withMessage("last name must be between 2 and 30 characters long"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email")
    .custom(async (email, { req }) => {
      const existingUser = await User.findOne({ email });

      if (existingUser && existingUser._id.toString() !== req.user.userId) {
        throw new Error("this email is already in use");
      }
    }),

  body("location").trim().notEmpty().withMessage("location is required"),
]);
