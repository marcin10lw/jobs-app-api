import "express-async-errors";
import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";

export const register = async (req, res) => {
  const isFirstUser = (await User.countDocuments()) === 0;

  req.body.role = isFirstUser ? "admin" : "user";

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ user });
};

export const login = (req, res) => {
  res.send("login suer");
};
