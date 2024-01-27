import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import validator from "validator";
import User from "../models/userModel";
import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();

const secret = process.env.JWT_SECRET as string;

const createToken = (_id: string) => {
  return jwt.sign({ _id }, secret, { expiresIn: 1200 });
};

// SignUp user
const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, mobile, password } = req.body;

  // Fields Validation before saving data to database
  if (!name || !email || !mobile || !password) {
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Invalid Email");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }

  // If user exists
  const exists = await User.findOne({ email });
  if (exists) {
    throw Error("User already exists");
  }

  try {
    // Create new user
    let user = new User({
      name,
      email,
      mobile,
      password,
    });
    // Add salting and hashing to password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    const result = await user.save();
    const token = createToken(user._id);
    console.log(token);
    res.status(200).json({ result, token });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Login User
const signIn = async (req: Request, res: Response) => {};

export { signUp, signIn };
