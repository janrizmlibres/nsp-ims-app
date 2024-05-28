import express from "express";
import { body } from "express-validator";
import * as adminController from "../controllers/admin.js";
import isAuth from "../middleware/is_auth.js";

const router = express.Router();

router.get("/users", isAuth, adminController.getUsers);

router.get("/user/:userId", isAuth, adminController.getUser);

router.put(
  "/user/:userId",
  isAuth,
  [
    body("firstName").trim().isAlpha("en-US"),
    body("middleName").optional({ values: "falsy" }).trim().isAlpha("en-US"),
    body("lastName").trim().isAlpha("en-US"),
    body("suffixName")
      .optional({ values: "falsy" })
      .trim()
      .matches("^[A-Za-z]+.$"),
    body("email").optional({ values: "falsy" }).trim().isEmail(),
    body("contactNum")
      .optional({ values: "falsy" })
      .trim()
      .isMobilePhone("en-PH"),
  ],
  adminController.updateUser
);

router.put(
  "/users/update-permissions",
  isAuth,
  adminController.updatePermissions
);

router.patch(
  "/user/password/:userId",
  isAuth,
  [body("newPw").isStrongPassword({ minLength: 8 })],
  adminController.updatePassword
);

router.patch(
  "/user/last-login/:userId",
  isAuth,
  adminController.updateLastLogin
);

router.post("/user/add-audit", isAuth, adminController.addAudit);

export default router;
