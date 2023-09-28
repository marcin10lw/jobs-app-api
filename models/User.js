import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

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
    avatar: String,
    avatarPublicId: String,
  },
  {
    timestamps: true,
    strictQuery: true,
  }
);

UserSchema.pre("save", async function () {
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(this.password, salt);
  this.password = hashedPassword;
});

UserSchema.method("generateToken", function () {
  const token = jwt.sign(
    {
      userId: this._id,
      role: this.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return token;
});

UserSchema.method("comparePasswords", async function (candidatePassword) {
  const isMatch = await bcryptjs.compare(candidatePassword, this.password);
  return isMatch;
});

UserSchema.method("toJSON", function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
});

const User = mongoose.model("user", UserSchema);

export default User;
