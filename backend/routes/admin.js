import express from "express";
import * as adminController from "../controllers/admin.js";

const router = express.Router();

router.get("/staff", adminController.getAllStaff);

export default router;
