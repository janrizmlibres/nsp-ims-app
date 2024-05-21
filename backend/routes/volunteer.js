import { body } from 'express-validator';

import express from "express";
import * as volunteerController from "../controllers/volunteer.js";
import isAuth from "../middleware/is_auth.js";

const router = express.Router();

router.get("/volunteers", isAuth, volunteerController.getAllVolunteers);

router.post("/add-volunteer", isAuth, volunteerController.addVolunteer);

router.get("/:id", isAuth, volunteerController.getVolunteer);

router.put("/update-volunteer/:id", isAuth, volunteerController.updateVolunteer);

export default router;