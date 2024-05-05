import express from "express";
import * as gradeController from "../controllers/grade.js";
import isAuth from "../middleware/is_auth.js";

const router = express.Router();

router.patch("/:gradeId/updateGrade", isAuth, gradeController.updateGrade)

export default router;

