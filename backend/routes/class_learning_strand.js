import express from "express";
import * as classLearningStrandController from "../controllers/class_learning_strand.js";
import isAuth from "../middleware/is_auth.js";

const router = express.Router();

// router.get("/:classLearningStrandId", isAuth, classLearningStrandController.getStrand);
router.get("/:classLearningStrandId/modules", isAuth, classLearningStrandController.getAllModules);
router.get("/module/:moduleId", isAuth, classLearningStrandController.getModule);
router.get("/:classLearningStrandId/grades", isAuth, classLearningStrandController.getAllGrades);
router.get("/:classLearningStrandId/sessions", isAuth, classLearningStrandController.getAllSessions);
router.get("/session/:sessionId", isAuth, classLearningStrandController.getSession);
router.post("/:classLearningStrandId/schedule/add", isAuth, classLearningStrandController.addSchedule);
router.post("/:classLearningStrandId/module/add", isAuth, classLearningStrandController.addModule);
router.post("/:classLearningStrandId/session/add", isAuth, classLearningStrandController.addSession);
router.patch("/schedule/:scheduleId/update", isAuth, classLearningStrandController.updateSchedule);
router.patch("/module/:moduleId/update", isAuth, classLearningStrandController.updateModule)
router.patch("/modules/update", isAuth, classLearningStrandController.updateModuleStatus)
router.patch("/session/:sessionId/update", isAuth, classLearningStrandController.updateSession)
router.put("/module/moduleSubmissions/update", isAuth, classLearningStrandController.updateModuleSubmissions);
router.put("/session/attendances/update", isAuth, classLearningStrandController.updateAttendances);
router.put("/grades/update", isAuth, classLearningStrandController.updateGrades);
router.delete("/modules/delete", isAuth, classLearningStrandController.deleteModules);
router.delete("/sessions/delete", isAuth, classLearningStrandController.deleteSessions);

export default router;

