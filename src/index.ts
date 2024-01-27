import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import env from "dotenv";
import cors, { CorsOptions } from "cors";

// Routes
import userRoutes from "./routes/userRouter";
import itemRoutes from "./routes/itemsRouter";

const app = express();

// Environment variables and constants
env.config();

const mongoURI = process.env.MONGO_URI as string;

// in case of multiple origins
// const allowedOrigins: (string | undefined)[] = [
//   "http://localhost:3000",
//   "http://localhost:3001",
//   "http://localhost:3002",
// ];
// const corsOptions: CorsOptions = {
//   origin: (
//     origin: string | undefined,
//     callback: (error: Error | null, allow: boolean) => void
//   ) => {
//     if (allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"), false);
//     }
//   },
// };

// Third party middlewares
// app.use(cors(corsOptions));
app.use(bodyParser.json());

// Route specific middlewares
app.use("/api/", userRoutes);
// app.use("/api/items", itemRoutes);

// Connect MongoDB
mongoose
  .connect(mongoURI)
  .then(() => {
    // because it returns promise
    console.log("Database Connected");
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log(`Server is running ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
