import ClassLearningStrand from "../models/class_learning_strand.js";
import ClassLevel from "../models/class_level.js";
import ClassSchedule from "../models/class_schedule.js";
import Enrollment from "../models/enrollment.js";
import Grade from "../models/grade.js";
import Learner from "../models/learner.js";
import LearningStrand from "../models/learning_strand.js";
import Module from "../models/module.js";
import Term from "../models/term.js"
import { Op } from "sequelize";
import Volunteer from "../models/volunteer/volunteer.js";

export async function getClass(req, res, next) {
    const classId = req.params.classId;

    try {
        const classLevel = await ClassLevel.findByPk(classId, {
            include: [Term]
        });
        
        res.status(200).json({
        message: "Fetched class successfully.",
        data: classLevel,
        });
    } catch (error) {
        if (!error.statusCode) {
        error.statusCode = 500;
        }
        next(error);
    }
}

// export async function addLearningStrand(req, res, next) {
//     const classId = req.params.classId;

//     const {
//         name,
//         teacher
//     } = req.body

//     try {
//         const classLevel = await ClassLevel.findByPk(classId);
//         const learningStrand = await LearningStrand.findOne({
//             where: {name:name}
//         })

//         const classLearningStrand = await ClassLearningStrand.findOne({
//             where: {
//                 classLevelId: classLevel.id,
//                 learningStrandId: learningStrand.id
//             }
//         })

//         if (classLearningStrand) {
//             const error = Error(`${learningStrand.name} exists already!`);
//             error.statusCode = 404;
//             throw error;
//         }

//         await classLevel.addLearning_strand(learningStrand, {
//             through: {
//                 teacher: teacher
//             }
//         })

//         const newClassLearningStrand = await ClassLearningStrand.findOne({
//             where: {
//                 classLevelId: classLevel.id,
//                 learningStrandId: learningStrand.id
//             }
//         })

//         const enrollments = await Enrollment.findAll({
//             where: {classLevelId: newClassLearningStrand.classLevelId}, 
//             include: [Learner]
//         })

//         for (const enrollment of enrollments) {
//             await newClassLearningStrand.addLearner(enrollment.learner, {
//                 through: Grade
//             })
//         }


//         res.status(201).json({ 
//             message: "Learning strand added!"
//         });
//     } catch (error) {
//         if (!error.statusCode) {
//             error.statusCode = 500;
//         }
//         next(error);
//     }
// }

export async function getAllStrands(req, res, next) {
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

export async function getAllModules(req, res, next) {
    const classId = req.params.classId;
    
    try {
        const modules = await ClassLearningStrand.findAll({
            where:{
                classLevelid: classId
            },
            include: [{
                model: Module,
                where: {
                    retrieval_date: { [Op.gte]: new Date() }
                },
                order: [['retrieval_date', 'ASC']]
            }, LearningStrand]
        })

        res.status(201).json({ 
            message: "Fetched all modules successfully!",
            data: modules
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

export async function getAllStudents(req, res, next) {
    const classId = req.params.classId;
    
    try {
        const activeStudents = await Learner.findAll({
            where: {
                '$enrollments.classLevelId$': classId,
                '$enrollments.status$': 'Active'
            }, include: {model: Enrollment}
        })

        const inactiveStudents = await Learner.findAll({
            where: {
                '$enrollments.classLevelId$': classId,
                '$enrollments.status$': 'Inactive'
            }, include: {model: Enrollment}
        })

        const dropStudents = await Learner.findAll({
            where: {
                '$enrollments.classLevelId$': classId,
                '$enrollments.status$': 'Drop'
            }, include: {model: Enrollment}
        })
        
        res.status(201).json({ 
            message: "Fetched all students successfully!",
            data: {
                active: activeStudents, 
                inactive: inactiveStudents, 
                drop: dropStudents
            }
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

// export async function updateStudentStatus(req, res, next) {
//     try {
//         const classId = req.params.classId
//         const learnerId = req.params.learnerId;
//         await Enrollment.update(
//             { status: req.body.newStatus}, 
//             { where: { classLevelId: classId, learnerId: learnerId }
//         });

//         res.status(200).json({ message: "Status updated!" });
//         } catch (error) {
//         if (!error.statusCode) {
//             error.statusCode = 500;
//         }
//         next(error);
//         return error;
//     }
// }

export async function getAllGrades(req, res, next) {
    // const classId = req.params.classId;

    // try {
    //     const grades = await ClassLearningStrand.findAll({
    //         where: {classLevelId: classId}, 
    //         include: [{
    //             model: Grade, include: {
    //                 model: Learner, include: [Enrollment]
    //             }
    //         }, LearningStrand]
    //     })

    //     res.status(201).json({ 
    //         message: "Grades fetched successfully!",
    //         data: grades
    //     });
    // } catch (error) {
    //     if (!error.statusCode) {
    //         error.statusCode = 500;
    //     }
    //     next(error);
    // }
}