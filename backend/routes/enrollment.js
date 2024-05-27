import express from "express";
import { body } from "express-validator";
import * as enrollmentController from "../controllers/enrollment.js";
import isAuth from "../middleware/is_auth.js";
import multer from 'multer'
import { fileStorage, enrollmentFormFilter } from '../util/multer_config.js'

const router = express.Router();

router.get("/retrieve-from-term/:termID", isAuth, enrollmentController.getAllEnrolledOnTerm);
router.get("/:studentId/:enrollmentId/retrieve", isAuth, enrollmentController.getEnrolled);
router.patch("/:enrollmentId/update", isAuth, 
  multer({ storage: fileStorage, fileFilter: enrollmentFormFilter }).array("enrollmentForm"),
  [
    body("fltPretestScore").customSanitizer((value) => JSON.parse(value)).isInt(),
    body("selectedRegularity").customSanitizer((value) => JSON.parse(value)).isString(),
    body("selectedRemarks").customSanitizer((value) => JSON.parse(value)).isString(),
  ],
  enrollmentController.updateEnrollment);
router.patch("/:enrollmentId/status/update", isAuth, enrollmentController.changeEnrollmentStatus);
router.post(
  "/enroll-learner", 
  isAuth,
  multer({ storage: fileStorage, fileFilter: enrollmentFormFilter }).array("enrollmentForm"),
  [
    body("learners").exists(),
    body("learners.*.lrn").isInt(),
    body("learners.*.classLevelID").isInt(),
    body("learners.*.ftl_pretest").isInt(),
    body("learners.*.regularity").isString(),
    body("learners.*.remarks").isString(),
    body("learners.*.currentTerm").isInt(),
  ],
  enrollmentController.enrollLearners);


  router.get("/enrollments", isAuth, enrollmentController.getAllEnrollments);
  
export default router;