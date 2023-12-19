import express from "express";
import {
  signUp,
  signIn,
} from "../../controllers/admin/adminController.js";

const router = express.Router();

router.post("/admin/signup", signUp);
router.post("/admin/signin", signIn);

export default router;
