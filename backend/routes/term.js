import express from "express";
import * as termController from "../controllers/term.js";
import isAuth from "../middleware/is-auth.js";

const router = express.Router();

router.get("/active_year", isAuth, termController.active_year);
router.post("/add_class", termController.add_class);

export default router;
