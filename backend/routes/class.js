import express from "express";
import * as classController from "../controllers/class.js";
import isAuth from "../middleware/is_auth.js";

const router = express.Router();

router.get("/:classId", isAuth, classController.getClass);
router.get("/:classId/strands", isAuth, classController.getAllStrands);
router.get("/:classId/students", isAuth, classController.getAllStudents);
router.get("/:classId/grades", isAuth, classController.getAllGrades);

export default router;
