import express from "express";
import * as enrollmentController from "../controllers/enrollment.js";
import isAuth from "../middleware/is_auth.js";
import { getAllCurrentEnrolled } from '../controllers/enrollment.js'

const router = express.Router();

router.get("/retrieve-from-term/:termID", isAuth, enrollmentController.getAllCurrentEnrolled);

export default router;