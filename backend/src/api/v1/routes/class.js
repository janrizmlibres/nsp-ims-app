import express from "express";
import * as classController from "../controllers/class.js";
import isAuth from "../middlewares/is_auth.js";

const router = express.Router();

router.get("/:classId", isAuth, classController.getClass);
router.get("/:classId/schedules", isAuth, classController.getClassSchedules);
router.post("/strands/add", isAuth, classController.addLearningStrands);
router.get("/:classId/strands", isAuth, classController.getAllStrands);
router.delete("/strands/remove", isAuth, classController.removeStrands);
router.get("/:classId/modules", isAuth, classController.getAllModules);
router.get("/:classId/students", isAuth, classController.getAllStudents);
router.get("/:classId/:enrollmentId/student", isAuth, classController.getStudent);

export default router;
