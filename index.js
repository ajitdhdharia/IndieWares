import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import env from "dotenv";
import cors from "cors";

// Routes
import userRoutes from "./src/routes/userRouter.js";
import adminRoutes from "./src/routes/admin/adminRouter.js";
import itemRoutes from "./src/routes/itemsRouter.js";
import instagramRoute from "./src/routes/instagramRoute.js";

const app = express();

// Environment variables and constants
env.config();

// in case of multiple origins
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// Third party middlewares
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Route specific middlewares
app.use("/api", userRoutes);
app.use("/api", adminRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/isntagram", instagramRoute);

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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
