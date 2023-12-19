import User from "../../models/userModel.js";
import jwt from "jsonwebtoken";

const signUp = async (req, res) => {
  // if User already exists using .exec() to execute the query
  try {
    const existingUser = await User.findOne({ email: req.body.email }).exec();

    if (existingUser) {
      return res.status(400).json({
        message: "Admin already registered",
      });
    } else {
      const { firstName, lastName, email, contactNumber, password } = req.body;

      const _user = new User({
        firstName,
        lastName,
        email,
        contactNumber,
        password,
        role: 'admin'
      });

      // save new user to database
      _user.save((error, data) => {
        if (error) {
          return res.status(400).json({ message: "Something went wrong" });
        }

        if (data) {
          return res.status(201).json({ message: "Admin created Successfully" });
        }
      });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Something went wrong", error: error.message });
  }
};

const signIn = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email }).exec();
    if (existingUser) {
      if (existingUser.authenticate(req.body.password) && existingUser.role === 'admin') {
        // Generate Token
        const token = jwt.sign(
          { _id: existingUser._id },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        const { _id, firstName, lastname, email, role, fullName } =
          existingUser;
        res.status(200).json({
          token,
          user: {
            _id,
            firstName,
            lastname,
            email,
            role,
            fullName,
          },
        });
      } else {
        return res.status(400).json({
          message: "Invalid password",
        });
      }
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Something went wrong", error: error.message });
  }
};

const requireSignIn = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  // Manage user session
  const user = jwt.verify(token, process.env.JWT_SECRET);
  req.user = user;
  next();
  //   jwt.decode();
};

export { signUp, signIn };
