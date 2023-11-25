const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000;
console.log(`The port env is: ${process.env}`);

const dbConnect = require("./config/dbConnect.js");
// const { notFound, errorHandler } = require("./middlewares/errorHandler");

const authRouter = require("./routes/authRoute"); // Module that handles the authentication
// const productRouter = require("./routes/productRoute");
// const blogRouter = require("./routes/blogRoute");
// const categoryRouter = require("./routes/prodcategoryRoute");
// const blogcategoryRouter = require("./routes/blogCatRoute");
// const brandRouter = require("./routes/brandRoute");
// const colorRouter = require("./routes/colorRoute");
// const enqRouter = require("./routes/enqRoute");
// const couponRouter = require("./routes/couponRoute");
// const uploadRouter = require("./routes/uploadRoute");
// const cookieParser = require("cookie-parser");
const morgan = require("morgan"); // Logging middleware
// const cors = require("cors");

// To connect to Database
dbConnect();

//Mount middleware functions
app.use(morgan("dev"));
// app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use("/api/user", authRouter);
// app.use("/api/product", productRouter);
// app.use("/api/blog", blogRouter);
// app.use("/api/category", categoryRouter);
// app.use("/api/blogcategory", blogcategoryRouter);
// app.use("/api/brand", brandRouter);
// app.use("/api/coupon", couponRouter);
// app.use("/api/color", colorRouter);
// app.use("/api/enquiry", enqRouter);
// app.use("/api/upload", uploadRouter);

// app.use(notFound);
// app.use(errorHandler);

app.get("/", (req, res) => {
  console.log("Request", req.rawHeaders);
  res.send("Hello from server side");
}); // TODO: Decide if you want to go with 'get' or 'use'.

app.listen(PORT, () => {
  console.log(`Server is running  at PORT ${PORT}`);
  console.log("entering the callback function");
});
