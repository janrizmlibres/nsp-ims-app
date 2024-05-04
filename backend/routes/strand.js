import express from "express";
import * as strandController from "../controllers/strand.js";
import isAuth from "../middleware/is_auth.js";

const router = express.Router();

router.get("/:classLearningStrandId", isAuth, strandController.getStrand);

export default router;

