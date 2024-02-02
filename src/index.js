import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import connectDB from "./db/index.js";

// Routes
// import userRoutes from "./routes/userRouter";

const app = express();
const port = process.env.PORT || 5000;

// Environment variables and constants
dotenv.config({
  path: "./env",
});

// connect DB
connectDB();

// Third party middlewares
app.use(bodyParser.json());

// Route specific middlewares
// app.use("/api/", userRoutes);
