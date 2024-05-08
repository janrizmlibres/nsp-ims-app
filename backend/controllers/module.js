import ClassLearningStrand from "../models/class_learning_strand.js";
import Learner from "../models/learner.js";
import LearningStrand from "../models/learning_strand.js";
import Module from "../models/module.js";
import ModuleSubmission from "../models/module_submission.js";

export async function getModule(req, res, next) {
    const moduleId = req.params.moduleId;

    try {
        const module = await Module.findByPk(moduleId, {
            include: [{
                model: ModuleSubmission, include: [Learner]
            }, {
                model: ClassLearningStrand, include: [LearningStrand]
            }]
        })
        
        res.status(200).json({
        message: "Fetched module successfully.",
        data: module,
        });
    } catch (error) {
        if (!error.statusCode) {
        error.statusCode = 500;
        }
        next(error);
    }
}

export async function updateModule(req, res, next) {
    const moduleId = req.params.moduleId

    try {
        await Module.update(
            req.body,
            { where: { id: moduleId }
        });

        res.status(200).json({ message: "Module updated!" });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        return error;
    } 
}

export async function updateModuleSubmission(req, res, next) {
    const moduleId = req.params.moduleId

    try {
        await ModuleSubmission.update({ 
            status: req.body.newStatus,
            date_submitted: req.body.newSubmissionDate,
            remarks: req.body.newRemarks
        }, { where: { id: moduleId }
        });

        res.status(200).json({ message: "Module submission updated!" });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        return error;
    }
}