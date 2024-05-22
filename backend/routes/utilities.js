import express from "express";
import * as utilitiesController from "../controllers/utilities.js";
import isAuth from "../middleware/is_auth.js";

const router = express.Router();

// for Academic Term Creation Operations
router.post("/term/create", isAuth, utilitiesController.addTerm);
router.get("/terms", isAuth, utilitiesController.getTerms);
router.patch("/term/:termId/update", isAuth, utilitiesController.updateTerm);

// for Learning Strand Creation Operations
router.post("/strand/create", isAuth, utilitiesController.addLearningStrand);
router.get("/strands", isAuth, utilitiesController.getLearningStrands);
router.patch("/strand/:strandId/update", isAuth, utilitiesController.updateLearningStrand);
router.delete("/strand/:strandId/delete", isAuth, utilitiesController.deleteLearningStrand);

// for Student Requirement Creation Operations
router.post("/requirement/create", isAuth, utilitiesController.addRequirement);
router.get("/requirements", isAuth, utilitiesController.getRequirements);
router.patch("/requirement/:requirementId/update", isAuth, utilitiesController.updateRequirement);
router.delete("/requirement/:requirementId/delete", isAuth, utilitiesController.deleteRequirement);

// for Student Category Creation Operations
router.post("/category/create", isAuth, utilitiesController.addCategory);
router.get("/categories", isAuth, utilitiesController.getCategories);
router.patch("/category/:categoryId/update", isAuth, utilitiesController.updateCategory);
router.delete("/category/:categoryId/delete", isAuth, utilitiesController.deleteCategory);

export default router;