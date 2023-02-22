import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../model/userModel.js";

export default {
  //@desc Register user
  //@route POST /api/users/register
  //@access public
  registerUser: asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.status(400);
      throw new Error("All fields are mandatory");
    }
    const userExist = await userModel.findOne({ email });
    if (!userExist) {
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword);
      const user = await userModel.create({
        username,
        email,
        password: hashedPassword,
      });
      res.json({
        _id: user._id,
        username: user.username,
        email: user.username,
      });
    } else {
      res.status(400);
      throw new Error("User already exist");
    }
  }),
  //@desc Login user
  //@route POST /api/users/login
  //@access public
  loginUser: asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("All fields are mandatory");
    }
    const user = await userModel.findOne({ email });
    //compare password with hashed password
    if (user && (await bcrypt.compare(password, user.password))) {
      const accesstoken = jwt.sign(
        {
          user: {
            username: user.username,
            email: user.email,
            id: user._id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1m" }
      );
      res.status(200).json({ accesstoken });
    } else {
      res.status(401);
      throw new Error("Email or Password is not valid");
    }
    res.json({ message: "user login" });
  }),
  //@desc Current user info
  //@route POST /api/users/current
  //@access private
  currentUser: asyncHandler(async (req, res) => {
    res.json({ message: "current user information" });
  }),
};
