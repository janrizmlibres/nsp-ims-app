import express from "express";
import * as utilitiesController from "../controllers/utilities.js";
import isAuth from "../middleware/is_auth.js";

const router = express.Router();

router.post("/terms/create", isAuth, utilitiesController.createTerm);
router.get("/strands", isAuth, utilitiesController.getLearningStrands);

export default router;