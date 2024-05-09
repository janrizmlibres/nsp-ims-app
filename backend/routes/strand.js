import express from "express";
import * as strandController from "../controllers/strand.js";
import isAuth from "../middleware/is_auth.js";

const router = express.Router();

router.get("/:classLearningStrandId", isAuth, strandController.getStrand);
router.get("/:classLearningStrandId/modules", isAuth, strandController.getAllModules);
router.get("/:classLearningStrandId/grades", isAuth, strandController.getAllGrades);
router.get("/:classLearningStrandId/sessions", isAuth, strandController.getAllSessions);
router.post("/:classLearningStrandId/schedule/add", isAuth, strandController.addSchedule);
router.post("/:classLearningStrandId/module/add", isAuth, strandController.addModule);
router.post("/:classLearningStrandId/session/add", isAuth, strandController.addSession);
router.patch("/:classLearningStrandId/teacher/update", isAuth, strandController.updateTeacher);
router.patch("/schedule/:scheduleId/update", isAuth, strandController.updateSchedule);
router.put("/grades/update", isAuth, strandController.updateGrades);
export default router;

