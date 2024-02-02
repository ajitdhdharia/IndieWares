import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ], // array of orders
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    addresses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
      },
    ],
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
