import express from "express";
import { body } from "express-validator";
import * as enrollmentController from "../controllers/enrollment.js";
import isAuth from "../middleware/is_auth.js";

const router = express.Router();

router.get("/retrieve-from-term/:termID", isAuth, enrollmentController.getAllEnrolledOnTerm);
router.get("/:studentId/:enrollmentId/retrieve", isAuth, enrollmentController.getEnrolled);
router.patch("/:enrollmentId/update", isAuth,
  [
    body("hasEnrollmentForm").isBoolean(),
    body("digitalLiteracyScore").isInt(),
    body("fltPretestScore").isInt(),
    body("callable").isBoolean(),
    body("bridger").isBoolean(),
    body("selectedRegularity").isString(),
    body("selectedRemarks").isString(),
  ],
  enrollmentController.updateEnrollment);
router.patch("/:enrollmentId/status/update", isAuth, enrollmentController.changeEnrollmentStatus);
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
router.get("/retrieve-modules/:enrollmentId/:classLearningStrandId", isAuth, enrollmentController.getEnrolledModules);
router.get("/retrieve-grades/:enrollmentId/:classLearningStrandId", isAuth, enrollmentController.getEnrolledGrades);
router.get("/retrieve-attendance/:enrollmentId/:classLearningStrandId", isAuth, enrollmentController.getEnrolledAttendance);

router.get("/enrollments", isAuth, enrollmentController.getAllEnrollments);

export default router;