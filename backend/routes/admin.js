import express from "express";
import { body } from "express-validator";
import * as adminController from "../controllers/admin.js";
import isAuth from "../middleware/is_auth.js";

const router = express.Router();

router.get("/staffs", isAuth, adminController.getStaffs);

router.get("/staff/:userId", isAuth, adminController.getStaff);

router.put(
  "/staff/:userId",
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
  adminController.updateStaff
);

export default router;
