import express from "express";
import * as utilitiesController from "../controllers/utilities.js";
import isAuth from "../middleware/is_auth.js";

const router = express.Router();

router.post("/term/create", isAuth, utilitiesController.addTerm);
router.get("/terms", isAuth, utilitiesController.getTerms);
router.get("/strands", isAuth, utilitiesController.getLearningStrands);

export default router;