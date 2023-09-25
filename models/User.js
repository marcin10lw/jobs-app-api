import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: {
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
  },
  password: {
    type: String,
  },
  location: {
    type: String,
    default: "my city",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

const User = mongoose.model("user", UserSchema);
export default User;
