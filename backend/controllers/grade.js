import ClassLearningStrand from "../models/class_learning_strand.js";
import Grade from "../models/grade.js";
import Learner from "../models/learner.js";
import LearningStrand from "../models/learning_strand.js";
import Module from "../models/module.js";
import ModuleSubmission from "../models/module_submission.js";

export async function updateGrade(req, res, next) {
    const gradeId = req.params.gradeId

    try {
        await Grade.update({ 
            first_quarter: req.body.newFirst_quarter,
            second_quarter: req.body.newSecond_quarter,
            third_quarter: req.body.newThird_quarter,
            fourth_quarter: req.body.newFourth_quarter,
            remarks: req.body.newRemarks
        }, { where: { id: gradeId }
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