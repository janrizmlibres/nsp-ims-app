import express from "express";
import * as adminController from "../controllers/admin.js";
import * as authController from "../controllers/authentication.js";

const router = express.Router();

router.get("/all-staff", adminController.getAllStaff);
router.get("/login", authController.login);

export default router;
