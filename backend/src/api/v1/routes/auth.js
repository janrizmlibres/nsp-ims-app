import express from "express";
import { body } from "express-validator";
import * as authController from "../controllers/auth.js";
import isAuth from "../middlewares/is_auth.js";

const router = express.Router();

router.post("/refresh-token", authController.refreshToken);

router.post("/login", authController.login);

router.post("/logout", authController.logout);

router.post(
  "/signup",
  isAuth,
  [
    body("password").isLength({ min: 8 }),
    body("firstName").isAlpha("en-US"),
    body("middleName").trim().optional({ values: "falsy" }).isAlpha("en-US"),
    body("lastName").isAlpha("en-US"),
    body("suffixName").trim().optional({ values: "falsy" }).isAlpha("en-US"),
    body("email").trim().optional({ values: "falsy" }).isEmail(),
    body("contactNum")
      .trim()
      .optional({ values: "falsy" })
      .isMobilePhone("en-PH"),
    body("position").trim().isAscii(),
    body("accessLevel").isInt({ min: 2, max: 3 }),
  ],
  authController.signup
);

export default router;
