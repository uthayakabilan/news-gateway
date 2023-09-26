import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { getUserName } from "../utils/authUtils.js";

export const loginHandler = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    if (email && password) {
      const user = await User.findOne({ email });
      if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
          const { password, __v, ...others } = user._doc;
          // Login success
          req.session.user = others;
          res.status(200).json({
            data: others,
          });
        } else {
          res.status(403).json({
            message: "Incorrect password",
          });
        }
      } else {
        res.status(400).json({
          message: "User not found. Please sign up",
        });
      }
    } else {
      res.status(400).json({
        message: "Invalid credential",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const signupController = async (req, res) => {
  try {
    const email = req.body.email;
    if (email !== undefined) {
      const olduser = await User.findOne({ email });
      if (!olduser) {
        const hashedPassword = await bcrypt.hash(req.body.password, 8);
        const username = getUserName(email);
        const newUser = await User.create({
          email,
          password: hashedPassword,
          auth_mode: "email-pass",
          username,
          email_verified: false,
        });
        const { password, __v, ...others } = newUser._doc;
        // Signup success
        req.session.user = others;
        res.status(201).json({
          data: others,
        });
      } else {
        res.status(409).json({
          message: `User already exists with ${olduser.auth_mode}`,
        });
      }
    } else {
      res.status(400).json({
        message: "Invalid credential",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const logOutController = (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          message: "Internal server error",
        });
      }
    });
    res.clearCookie("connect.sid");
    res.status(200).json({ message: "user logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
