import express from "express";
import {
  signUp,
  signIn
} from "../controllers/userController";

const router = express.Router();

// SignUp route
router.post("/signup", signUp);
// Login route
router.post("/signin", signIn);

export default router;
