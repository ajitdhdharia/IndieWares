import { Document, Schema, model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  mobile: string;
  password?: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  mobile: {
    type: String,
    required: true,
    match: [/^\+1\d{10}$/, "Please fill a valid +1 mobile number"],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

const User = model<IUser>("User", userSchema);

export default User;
