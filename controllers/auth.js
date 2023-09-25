import "express-async-errors";
import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import { UnauthenticatedError } from "../errors/errors.js";

export const register = async (req, res) => {
  const isFirstUser = (await User.countDocuments()) === 0;
  req.body.role = isFirstUser ? "admin" : "user";

  await User.create(req.body);

  res.status(StatusCodes.CREATED).json({ msg: "user created" });
};

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    throw new UnauthenticatedError("invalid credentials");
  }

  const isPasswordCorrect = await user.comparePasswords(req.body.password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("invalid credentials");
  }

  const token = await user.generateToken();

  res.status(StatusCodes.OK).json({ token });
};
