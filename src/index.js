import dotenv from "dotenv";
import connectDB from "./db/index.js";

const port = process.env.PORT || 5000;

// Routes
// import userRoutes from "./routes/userRouter";



// Environment variables and constants
dotenv.config({
  path: "./env",
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

// Route specific middlewares
// app.use("/api/", userRoutes);
