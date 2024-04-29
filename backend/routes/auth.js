import express from "express";
import { body } from "express-validator";
import * as authController from "../controllers/auth.js";
import isAuth from "../middleware/is_auth.js";

const router = express.Router();

router.post("/login", authController.login);

router.post(
  "/signup",
  isAuth,
  [
    body("password").trim().isLength({ min: 8 }),
    body("firstName").isAlpha("en-US"),
    body("middleName")
      .trim()
      .replace([""], null)
      .optional({ values: "falsy" })
      .isAlpha("en-US"),
    body("lastName").isAlpha("en-US"),
    body("suffixName")
      .trim()
      .replace([""], null)
      .optional({ values: "falsy" })
      .isAlpha("en-US"),
    body("email")
      .trim()
      .replace([""], null)
      .optional({ values: "falsy" })
      .isEmail(),
    body("contactNum")
      .trim()
      .replace([""], null)
      .optional({ values: "falsy" })
      .isMobilePhone("en-PH"),
  ],
  authController.signup
);

export default router;
