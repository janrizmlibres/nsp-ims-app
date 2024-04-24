import express from "express";
import { body } from "express-validator";
import * as authController from "../controllers/auth.js";

const router = express.Router();

router.post(
  "/login",
  [
    body("username").trim().not().isEmpty(),
    body("password").trim().isLength({ min: 4 }),
    body("first_name").trim().not().isEmpty(),
    body("last_name").trim().not().isEmpty(),
    body("email")
      .if((value) => value.length !== 0)
      .isEmail(),
  ],
  authController.login
);

router.post("/signup", authController.signup);

export default router;
