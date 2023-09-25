import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "first name is required"],
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, "last name is required"],
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "email is required"],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "password is required"],
    },
    location: {
      type: String,
      trim: true,
      default: "my city",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
    strictQuery: true,
  }
);

const User = mongoose.model("user", UserSchema);
export default User;
