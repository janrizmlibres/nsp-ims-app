import ClassLearningStrand from "../models/class_learning_strand.js";
import ClassLevel from "../models/class_level.js";
import ClassSchedule from "../models/class_schedule.js";
import Enrollment from "../models/enrollment.js";
import Grade from "../models/grade.js";
import LearningStrand from "../models/learning_strand.js";
import Module from "../models/module.js";
import Term from "../models/term.js"
import { Op } from "sequelize";
import Volunteer from "../models/volunteer/volunteer.js";
import Student from "../models/student/student.js";

// export async function getClass(req, res, next) {
//     const classId = req.params.classId;

//     try {
//         const classLevel = await ClassLevel.findByPk(classId, {
//             include: [Term]
//         });
        
//         res.status(200).json({
//         message: "Fetched class successfully.",
//         data: classLevel,
//         });
//     } catch (error) {
//         if (!error.statusCode) {
//         error.statusCode = 500;
//         }
//         next(error);
//     }
// }

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

// export async function getAllModules(req, res, next) {
//     const classId = req.params.classId;
    
//     try {
//         const modules = await ClassLearningStrand.findAll({
//             where:{
//                 classLevelid: classId
//             },
//             include: [{
//                 model: Module,
//                 where: {
//                     retrieval_date: { [Op.gte]: new Date() }
//                 },
//                 order: [['retrieval_date', 'ASC']]
//             }, LearningStrand]
//         })

//         res.status(201).json({ 
//             message: "Fetched all modules successfully!",
//             data: modules
//         });
//     } catch (error) {
//         if (!error.statusCode) {
//             error.statusCode = 500;
//         }
//         next(error);
//     }
// }

// export async function getAllStudents(req, res, next) {
//     const classId = req.params.classId;
    
//     try {
//         const activeStudents = await Student.findAll({
//             where: {
//                 '$enrollments.classLevelId$': classId,
//                 '$enrollments.status$': 'Active'
//             }, include: {model: Enrollment}
//         })

//         const inactiveStudents = await Student.findAll({
//             where: {
//                 '$enrollments.classLevelId$': classId,
//                 '$enrollments.status$': 'Inactive'
//             }, include: {model: Enrollment}
//         })

//         const dropStudents = await Student.findAll({
//             where: {
//                 '$enrollments.classLevelId$': classId,
//                 '$enrollments.status$': 'Drop'
//             }, include: {model: Enrollment}
//         })
        
//         res.status(201).json({ 
//             message: "Fetched all students successfully!",
//             data: {
//                 active: activeStudents, 
//                 inactive: inactiveStudents, 
//                 drop: dropStudents
//             }
//         });
//     } catch (error) {
//         if (!error.statusCode) {
//             error.statusCode = 500;
//         }
//         next(error);
//     }
// }

// export async function getAllGrades(req, res, next) {
//     const classId = req.params.classId;

//     try {
//         const grades = await ClassLearningStrand.findAll({
//             where: {classLevelId: classId}, 
//             include: [{
//                 model: Grade, include: {
//                     model: Student, include: [Enrollment]
//                 }
//             }, LearningStrand]
//         })

//         res.status(201).json({ 
//             message: "Grades fetched successfully!",
//             data: grades
//         });
//     } catch (error) {
//         if (!error.statusCode) {
//             error.statusCode = 500;
//         }
//         next(error);
//     }
// }