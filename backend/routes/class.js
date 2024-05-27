import express from "express";
import * as classController from "../controllers/class.js";
import isAuth from "../middleware/is_auth.js";

const router = express.Router();

router.get("/:classId/schedules", isAuth, classController.getClassSchedules);
router.get("/:classId/students", isAuth, classController.getAllStudents);
router.get("/:classId/:enrollmentId/student", isAuth, classController.getStudent);

export default router;
