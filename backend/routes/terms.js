import express from "express";
import { body } from "express-validator";
import * as termController from "../controllers/terms.js";
import isAuth from "../middleware/is-auth.js";

const router = express.Router();

router.post("/createTerm", isAuth, termController.createTerm);

export default router;