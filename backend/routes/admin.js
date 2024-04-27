import express from "express";
import * as adminController from "../controllers/admin.js";
import isAuth from "../middleware/is_auth.js";

const router = express.Router();

router.get("/staffs", isAuth, adminController.getStaffs);

export default router;
