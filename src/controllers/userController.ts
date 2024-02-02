import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import validator from "validator";
import User, { IUser } from "../models/user.model";
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
    // Save user to database
    const result = await user.save();
    // Create token
    const token = createToken(user._id);
    res.status(200).json({ result, token });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Login User
const signIn = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  try {
    const user: IUser | null = await User.findOne({
      email: email.toLowerCase(),
    }).select("+password");

    if (!user) {
      throw Error("User does not exists");
    }

    const hashedPassword = user.password as string;
    const match = await bcrypt.compare(password, hashedPassword);

    if (match) {
      const token = createToken(user._id);
      res.status(200).json({ user, token });
    } else {
      throw Error("Invalid credentials");
    }
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export { signUp, signIn };
