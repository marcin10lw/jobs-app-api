import {
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
} from "../errors/errors.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    throw new UnauthenticatedError("authentication invalid");
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(payload.userId).select("id role");
    const isTestUser = user._id.toString() === "6516036e1bc0daf94463cfef";

    if (!user) {
      return res.status(404).json({ msg: "user does not exist" });
    }

    req.user = {
      userId: user.id,
      role: user.role,
      isTestUser,
    };

    next();
  } catch (error) {
    throw new UnauthenticatedError("authentication invalid");
  }
};

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("unauthorized to access this route");
    }

    next();
  };
};

export const checkForTestUser = (req, res, next) => {
  const { isTestUser } = req.user;

  if (isTestUser) {
    throw new BadRequestError("Demo User. Read Only!");
  }

  next();
};
