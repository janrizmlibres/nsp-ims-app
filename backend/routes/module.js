import express from "express";
import * as moduleController from "../controllers/module.js";
import isAuth from "../middleware/is_auth.js";

const router = express.Router();

router.get("/:moduleId", isAuth, moduleController.getModule);
router.patch("/:moduleId/updateSubmission", isAuth, moduleController.updateModuleSubmission)

export default router;

