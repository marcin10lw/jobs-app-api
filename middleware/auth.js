import { UnauthenticatedError } from "../errors/errors.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    throw new UnauthenticatedError("authentication invalid");
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(payload.userId).select("id role");

    if (!user) {
      return res.status(404).json({ msg: "user does not exist" });
    }

    req.user = {
      userId: user.id,
      role: user.role,
    };

    next();
  } catch (error) {
    throw new UnauthenticatedError("authentication invalid");
  }
};

export default authMiddleware;
