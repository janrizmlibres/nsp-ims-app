import express from "express";
import { body } from "express-validator";
import * as enrollmentController from "../controllers/enrollment.js";
import isAuth from "../middleware/is_auth.js";

const router = express.Router();

router.get("/retrieve-from-term/:termID", isAuth, enrollmentController.getAllEnrolledOnTerm);
router.get("/retrieve-enrolled/:lrn/:academicYear/:classLevel", isAuth, enrollmentController.getEnrolled);
router.post("/update-learner", isAuth, enrollmentController.updateEnrollment);
router.post("/change-enrollment-status", isAuth, enrollmentController.changeEnrollmentStatus);
router.post(
  "/enroll-learner", 
  isAuth, 
  [
    body("lrn").isInt(),
    body("classLevelID").isInt(),
    body("hasEnrollmentForm").isBoolean(),
    body("digital_literacy").isInt(),
    body("ftl_pretest").isInt(),
    body("callable").isBoolean(),
    body("bridger").isBoolean(),
    body("regularity").isString(),
    body("remarks").isString(),
  ],
  enrollmentController.enrollLearner);

export default router;