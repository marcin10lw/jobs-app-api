import { Router } from "express";
import { register, login, logout } from "../controllers/auth.js";
import { validateLogin, validateRegister } from "../middleware/validation.js";

const router = Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.get("/logout", logout);

export default router;
