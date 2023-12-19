import express from "express";
import {
  signUp,
  signIn,
  requireSignIn,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/profile", requireSignIn, (req, res) => {
  res.status(200).json({ user: "profile" });
});

export default router;
