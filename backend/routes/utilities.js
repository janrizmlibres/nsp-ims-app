import express from "express";
import * as utilitiesController from "../controllers/utilities.js";
import isAuth from "../middleware/is_auth.js";

const router = express.Router();

router.post("/term/create", isAuth, utilitiesController.addTerm);
router.get("/terms", isAuth, utilitiesController.getTerms);
router.post("/strand/create", isAuth, utilitiesController.addLearningStrand);
router.get("/strands", isAuth, utilitiesController.getLearningStrands);
router.post("/requirement/create", isAuth, utilitiesController.addRequirement);

export default router;