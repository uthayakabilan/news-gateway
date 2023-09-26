import express from "express";
import {
  logOutController,
  loginHandler,
  signupController,
} from "../controllers/authController.js";
const router = express.Router();

router.post("/login", loginHandler);
router.post("/signup", signupController);
router.get("/logout", logOutController);

//get -> browsers
//post -> postman

export default router;
