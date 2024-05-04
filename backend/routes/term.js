import express from "express";
import * as termController from "../controllers/term.js";
import isAuth from "../middleware/is_auth.js";

const router = express.Router();

router.get("/active", isAuth, termController.getActiveTerm);
router.get("/terms", isAuth, termController.getAllTerms);
router.post("/add_class", termController.addClass);

export default router;
