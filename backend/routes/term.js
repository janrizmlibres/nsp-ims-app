import express from "express";
import * as termController from "../controllers/term.js";
import isAuth from "../middleware/is-auth.js";

const router = express.Router();

router.get("/active-year", isAuth, termController.getActiveYear);

export default router;
