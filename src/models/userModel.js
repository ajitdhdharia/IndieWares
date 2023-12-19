import mongoose from "mongoose";
import bcrypt from "bcrypt"; // Hashing algorithm

const saltRounds = 6;

//  Creat new User schema - Mongoose schema takes an object
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true, // indexing is required to query based on the user email
      lowercase: true,
    },
    contactNumber: {
      type: String,
    },
    hash_password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "admin",
    },
  },
  { timestamps: true }
);

// Virtuals are document properties that you can get and set but do not get persisted to MongoDB.
// we'll use here for hasing and salting
userSchema.virtual("password").set(function (password) {
  this.hash_password = bcrypt.hashSync(password, saltRounds);
});

userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Authenticate user for signIn
userSchema.methods = {
  authenticate: function (password) {
    return bcrypt.compareSync(password, this.hash_password); // sync password
  },
};

const User = mongoose.model("User", userSchema); // Create user model - specify model name and schema

export default User;
