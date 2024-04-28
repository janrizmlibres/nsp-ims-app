import express from "express";
import * as classesController from "../controllers/classes.js";

const router = express.Router();

router.post("/createClass", classesController.login);

export default router;
