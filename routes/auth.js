import { Router } from "express";
import { register, login } from "../controllers/auth.js";
import { validateRegister } from "../middleware/validation.js";

const router = Router();

router.post("/register", validateRegister, register);
router.post("/login", login);

export default router;
