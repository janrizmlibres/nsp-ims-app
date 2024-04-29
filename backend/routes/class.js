import express from "express";
import * as classController from "../controllers/class.js";
import isAuth from "../middleware/is_auth.js";

const router = express.Router();

router.get("/count", isAuth, classController.count);
router.post("/getClass", isAuth, classController.getClass);
router.post("/addLearningStrand", isAuth, classController.addLearningStrand);
router.post("/learningStrand/addSchedule", isAuth, classController.addSchedule);
router.post("/allStrands", isAuth, classController.getAllStrands);

export default router;
