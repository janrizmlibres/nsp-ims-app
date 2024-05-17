import express from "express";
import * as classController from "../controllers/class.js";
import isAuth from "../middleware/is_auth.js";

const router = express.Router();

router.get("/classes", isAuth, classController.getAllClasses);
// router.get("/:classId", isAuth, classController.getClass);
router.get("/:classId/classLearningStrands", isAuth, classController.getAllLearningStrands);
// router.get("/:classId/modules", isAuth, classController.getAllModules);
// router.get("/:classId/students", isAuth, classController.getAllStudents);

export default router;
