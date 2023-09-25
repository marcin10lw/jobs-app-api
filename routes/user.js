import { Router } from "express";
import {
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from "../controllers/user.js";
import { validateUpdateUser } from "../middleware/validation.js";

const router = Router();

router.get("/current-user", getCurrentUser);
router.get("/admin/app-stats", getApplicationStats);
router.patch("/update-user", validateUpdateUser, updateUser);

export default router;
