import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import env from "dotenv";

// Routes
import userRoutes from "./routes/userRouter";

const app = express();
const port = process.env.PORT || 5000;

// Environment variables and constants
env.config();

const mongoURI = process.env.MONGO_URI;

// Third party middlewares
app.use(bodyParser.json());

// Route specific middlewares
app.use("/api/", userRoutes);

// Connect MongoDB
mongoose
  .connect(mongoURI)
  .then(() => {
    // because it returns promise
    console.log("Database Connected");
    // listen for requests
    app.listen(port, () => {
      console.log(`Server is running ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
