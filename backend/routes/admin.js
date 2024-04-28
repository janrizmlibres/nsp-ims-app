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
    body("firstName").isAlpha("en-US"),
    body("middleName").optional({ values: "falsy" }).isAlpha("en-US"),
    body("lastName").isAlpha("en-US"),
    body("suffixName").optional({ values: "falsy" }).isAlpha("en-US"),
    body("email").optional({ values: "falsy" }).isEmail(),
    body("contactNum").optional({ values: "falsy" }).isMobilePhone("en-PH"),
  ],
  adminController.updateStaff
);

export default router;
