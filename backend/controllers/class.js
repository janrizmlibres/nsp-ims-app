import ClassLearningStrand from "../models/class/class_learning_strand.js";
import ClassLevel from "../models/class/class_level.js";
import ClassSchedule from "../models/class/class_schedule.js";
import LearningStrand from "../models/learning_strand.js";
import Term from "../models/term.js"
import Volunteer from "../models/volunteer/volunteer.js";

export async function getAllClasses(req, res, next) {
    try {
        const terms = await Term.findAll({ 
            include: [ClassLevel]}
        );

        for (const term of terms) {
            for (const classLevel of term.class_levels) {
                const activeCount = await classLevel.countEnrollments({
                    where: {
                        status: 'Active'
                    }
                })
    
                const inactiveCount = await classLevel.countEnrollments({
                    where: {
                        status: 'Inactive'
                    }
                })
    
                const dropCount = await classLevel.countEnrollments({
                    where: {
                        status: 'Drop'
                    }
                })
    
                classLevel.dataValues.activeCount = activeCount
                classLevel.dataValues.inactiveCount = inactiveCount
                classLevel.dataValues.dropCount = dropCount
                classLevel.dataValues.total = activeCount + inactiveCount + dropCount
            }
        }
        
        res.status(200).json({
            message: "Fetched all classes successfully.",
            data: terms,
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

export async function getAllLearningStrands(req, res, next) {
    const classId = req.params.classId;

    try {
        const classLearningStrands = await ClassLearningStrand.findAll({
            where: {classLevelId: classId}, 
            include: [
                LearningStrand, 
                {
                    model: ClassSchedule,
                    include: [Volunteer]
                }
            ],
            order: [[LearningStrand, 'code', 'ASC']]
        })

        res.status(201).json({ 
            message: "Fetched all strands successfully!",
            data: classLearningStrands
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}