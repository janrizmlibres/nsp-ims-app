import express from "express";
import * as volunteerController from "../controllers/volunteer.js";
import isAuth from "../middleware/is_auth.js";

const router = express.Router();

router.get("/volunteers", isAuth, volunteerController.getAllVolunteers);

export default router;