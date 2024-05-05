import express from "express";
import * as strandController from "../controllers/strand.js";
import isAuth from "../middleware/is_auth.js";

const router = express.Router();

router.get("/:classLearningStrandId", isAuth, strandController.getStrand);
router.get("/:classLearningStrandId/modules", isAuth, strandController.getAllModules);
router.get("/:classLearningStrandId/grades", isAuth, strandController.getAllGrades);
router.post("/:classLearningStrandId/module/add", isAuth, strandController.addModule);

export default router;

