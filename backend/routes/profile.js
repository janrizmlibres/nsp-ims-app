import express from "express";
import isAuth from "../middleware/is_auth.js";
import * as profileController from "../controllers/profile.js";

const router = express.Router();

router.get("/students", isAuth, profileController.getStudents);

router.post("/student/add", isAuth, profileController.addStudent);

router.get("/student/:id", isAuth, profileController.getStudent);

export default router;
