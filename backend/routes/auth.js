import express from "express";
import { body } from "express-validator";
import * as authController from "../controllers/auth.js";
import isAuth from "../middleware/is-auth.js";

const router = express.Router();

router.post("/login", authController.login);

router.post(
  "/signup",
  isAuth,
  [
    body("username").trim().not().isEmpty(),
    body("password").isStrongPassword({ minLength: 8 }),
    body("firstName").isAlpha("en-US"),
    body("middleName").optional({ values: "null" }).isAlpha("en-US"),
    body("lastName").isAlpha("en-US"),
    body("suffixName").optional({ values: "null" }).isAlpha("en-US"),
    body("email").optional({ values: "null" }).isEmail(),
    body("contactNum").optional({ values: "null" }).isMobilePhone("en-PH"),
  ],
  authController.signup
);

export default router;
