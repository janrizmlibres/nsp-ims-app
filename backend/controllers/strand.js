import ClassLearningStrand from "../models/class_learning_strand.js";
import ClassLevel from "../models/class_level.js";
import ClassSchedule from "../models/class_schedule.js";
import Enrollment from "../models/enrollment.js";
import Learner from "../models/learner.js";
import LearningStrand from "../models/learning_strand.js";
import Module from "../models/module.js";

export async function getStrand(req, res, next) {
    const classLearningStrandId = req.params.classLearningStrandId;

    try {
        const classLearningStrand = await ClassLearningStrand.findByPk(classLearningStrandId, {
            include: [LearningStrand, ClassSchedule]
        })
        
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

export async function addModule(req, res, next) {
    const classLearningStrandId = req.params.classLearningStrandId;

    const {
        name,
        distriDate,
        retriDate
    } = req.body

    try {
        const classLearningStrand = await ClassLearningStrand.findByPk(classLearningStrandId)

        const module = await classLearningStrand.createModule({
            title: name,
            distribution_date: distriDate,
            retrieval_date: retriDate
        })

        const enrollments = await Enrollment.findAll({
            where: {classLevelId: classLearningStrand.classLevelId}, 
            include: [Learner]
        })

        for (const enrollment of enrollments) {
            await module.addLearner(enrollment.learner)
        }

        res.status(201).json({ 
            message: "Module added!"
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

export async function getAllModules(req, res, next) {
    const classLearningStrandId = req.params.classLearningStrandId;

    try {
        const modules = await Module.findAll({
            where: {classLearningStrandId: classLearningStrandId}
        })

        for (const module of modules) {
            const noSubmissions = await module.countModule_submissions({
                where: {status: 'No Submission'}
            })
    
            const lacking = await module.countModule_submissions({
                where: {status: 'Lacking'}
            })
    
            const complete = await module.countModule_submissions({
                where: {status: 'Complete'}
            })
    
            const total = noSubmissions + lacking + complete

            module.dataValues.noSubmissions = noSubmissions
            module.dataValues.lacking = lacking
            module.dataValues.complete = complete
            module.dataValues.total = total

            console.log(module);
        }

        res.status(201).json({ 
            message: "Modules fetched successfully!",
            data: modules
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}