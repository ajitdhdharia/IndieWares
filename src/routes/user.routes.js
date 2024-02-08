import { Router } from "express";
import { signUp } from "../controllers/user.controller.js";

const router = Router();

// SignUp route
router.route("/signup").post(signUp);

export default router;
