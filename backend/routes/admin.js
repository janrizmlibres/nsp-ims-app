import express from "express";
import * as adminController from "../controllers/admin.js";
import isAuth from "../middleware/is-auth.js";

const router = express.Router();

router.get("/all-staff", isAuth, adminController.getAllStaff);

export default router;
