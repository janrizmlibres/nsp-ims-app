import ClassLearningStrand from "../models/class_learning_strand.js";
import ClassSchedule from "../models/class_schedule.js";
import LearningStrand from "../models/learning_strand.js";

export async function getStrand(req, res, next) {
    const classLearningStrandId = req.params.classLearningStrandId;

    try {
        const classLearningStrand = await ClassLearningStrand.findByPk(classLearningStrandId, {
            include: [LearningStrand, ClassSchedule]
        })

        console.log(classLearningStrand);
        
        res.status(200).json({
        message: "Fetched class successfully.",
        data: classLearningStrand,
        });
    } catch (error) {
        if (!error.statusCode) {
        error.statusCode = 500;
        }
        next(error);
    }
}