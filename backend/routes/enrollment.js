import express from "express";
import * as enrollmentController from "../controllers/enrollment.js";
import isAuth from "../middleware/is_auth.js";

const router = express.Router();

router.get("/retrieve-from-term/:termID", isAuth, enrollmentController.getAllEnrolledOnTerm);
router.post("/enroll-learner", isAuth, enrollmentController.enrollLearner);


export default router;