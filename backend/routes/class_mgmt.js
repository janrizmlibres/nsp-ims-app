import express from "express";
import { body } from "express-validator";
import * as classMgmtController from "../controllers/class_mgmt.js";
import isAuth from "../middleware/is-auth.js";

const router = express.Router();

router.post("/createClass", classMgmtController.login);

export default router;
