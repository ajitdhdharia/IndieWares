import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import env from "dotenv";
import cors from "cors";

// Routes
import userRoutes from "./src/routes/userRouter.js";
import adminRoutes from "./src/routes/admin/adminRouter.js";
import itemRoutes from "./src/routes/itemsRouter.js";

// Environment variables and constants
env.config();

const app = express();

// Third party middlewares
app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.json());

// Route specific middlewares
app.use("/api", userRoutes);
app.use("/api", adminRoutes);
app.use("/api/items", itemRoutes);

// Connect MongoDB
const encodedDBPassword = encodeURIComponent(process.env.MONGO_DB_PASSWORD); // because the password cantain special character '@'
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${encodedDBPassword}@cluster0.yap1y51.mongodb.net/?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
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
