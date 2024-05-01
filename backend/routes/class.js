import express from "express";
import * as classController from "../controllers/class.js";
import isAuth from "../middleware/is_auth.js";

const router = express.Router();

router.post("/count", isAuth, classController.count);
router.post("/getClass", isAuth, classController.getClass);
router.post("/allStrands", isAuth, classController.getAllStrands);
router.post("/allModules", isAuth, classController.getAllModules);
router.post("/allStudents", isAuth, classController.getAllStudents);
router.post("/addLearningStrand", isAuth, classController.addLearningStrand);
router.post("/learningStrand/addSchedule", isAuth, classController.addSchedule);

export default router;
