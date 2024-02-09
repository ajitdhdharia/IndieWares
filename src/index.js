import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

const port = process.env.PORT || 5000;

// Environment variables and constants
dotenv.config({
  path: "./.env",
});

// connect DB
connectDB()
  .then(() => {
    app.on("error", (err) => {
      console.log("ERROR: ", err);
      throw err;
    });

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("MONGO DB connection failed !!!", error);
  });
