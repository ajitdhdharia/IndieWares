import { Router } from "express";
import { logoutUser, signIn, signUp } from "../controllers/user.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/signup").post(upload.any(), signUp);
router.route("/signin").post(signIn);

// Secured routes
router.route("/logout").post(verifyJWT, logoutUser);

export default router;
