import Attendance from "../models/attendance.js";
import ClassLearningStrand from "../models/class_learning_strand.js";
import ClassSchedule from "../models/class_schedule.js";
import Enrollment from "../models/enrollment.js";
import Grade from "../models/grade.js";
import LearningStrand from "../models/learning_strand.js";
import Module from "../models/module.js";
import Session from "../models/session.js";
import Student from "../models/student/student.js";
import Volunteer from "../models/volunteer/volunteer.js";
import ModuleSubmission from "../models/module_submission.js";

// export async function getStrand(req, res, next) {
//     const classLearningStrandId = req.params.classLearningStrandId;

//     try {
//         const classLearningStrand = await ClassLearningStrand.findByPk(classLearningStrandId, {
//             include: [LearningStrand, {model:Volunteer, include: [ClassSchedule]}]
//         })
        
//         res.status(200).json({
//         message: "Fetched class successfully.",
//         data: classLearningStrand,
//         });
//     } catch (error) {
//         if (!error.statusCode) {
//         error.statusCode = 500;
//         }
//         next(error);
//     }
// }

export async function addModule(req, res, next) {
    const classLearningStrandId = req.params.classLearningStrandId;

    const {
        title,
        distriDate,
        retriDate
    } = req.body

    try {
        const classLearningStrand = await ClassLearningStrand.findByPk(classLearningStrandId)

        const mod = await Module.findOne({
            where: {title: title, classLearningStrandId: classLearningStrandId}
        })

        if (mod) {
            const error = new Error("Module exists already!");
            error.statusCode = 404;
            throw error;
        }

        const module = await classLearningStrand.createModule({
            title: title,
            distribution_date: distriDate,
            retrieval_date: retriDate
        })

        const enrollments = await Enrollment.findAll({
            where: {classLevelId: classLearningStrand.classLevelId}, 
            include: [Student]
        })

        for (const enrollment of enrollments) {
            await module.addStudent(enrollment.student)
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

export async function getModule(req, res, next) {
    const moduleId = req.params.moduleId;

    try {
        const module = await Module.findByPk(moduleId, {
            include: [{
                model: ModuleSubmission, include: [Student]
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

export async function updateModuleSubmissions(req, res, next) {
    try {
        for (const moduleSubmission of req.body.updatedData) {
            const moduleSubmissionInstance = await ModuleSubmission.findByPk(moduleSubmission.id);

            await moduleSubmissionInstance.update({
                status: moduleSubmission.status,
                date_submitted: moduleSubmission.date_submitted,
                remarks: moduleSubmission.remarks
            });
        }

        res.status(200).json({ message: "Module submission updated!" });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        return error;
    }
}

export async function getAllGrades(req, res, next) {
    const classLearningStrandId = req.params.classLearningStrandId;

    try {
        const classLearningStrand = await ClassLearningStrand.findByPk(classLearningStrandId)

        const grades = await Grade.findAll({
            where: {classLearningStrandId: classLearningStrandId}, 
            include: [{
                model: Student, include: {model: Enrollment, where: {classLevelId: classLearningStrand.classLevelId}}
            }, {
                model: ClassLearningStrand, include: [LearningStrand]
            }]
        })

        res.status(201).json({ 
            message: "Grades fetched successfully!",
            data: grades
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

export async function updateGrades(req, res, next) {
    try {
        for (const student of req.body.updatedData) {
            const studentInstance = await Student.findByPk(student.studentId, {
                include: {model: Grade, where: {
                    classLearningStrandId: student.classLearningStrandId
                }},
            });

            await studentInstance.grades[0].update(student.grades);
        }
        
            res.status(200).json({ message: "Grade Updated!" });
        } catch (error) {
            if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        return error;
    }
}

export async function addSession(req, res, next) {
    const classLearningStrandId = req.params.classLearningStrandId;

    const {
        date,
    } = req.body

    try {
        const classLearningStrand = await ClassLearningStrand.findByPk(classLearningStrandId)

        const sesh = await Session.findOne({
            where: {date: date, classLearningStrandId: classLearningStrandId}
        })

        if (sesh) {
            const error = new Error("Session exists already!");
            error.statusCode = 404;
            throw error;
        }

        const session = await classLearningStrand.createSession({
            date: date,
        })

        const enrollments = await Enrollment.findAll({
            where: {classLevelId: classLearningStrand.classLevelId}, 
            include: [Student]
        })

        for (const enrollment of enrollments) {
            await session.addStudent(enrollment.student)
        }

        res.status(201).json({ 
            message: "Session added!"
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

export async function getAllSessions(req, res, next) {
    const classLearningStrandId = req.params.classLearningStrandId;

    try {
        const sessions = await Session.findAll({
            where: {
                classLearningStrandId: classLearningStrandId
            }
        })

        for (const session of sessions) {
            const absent = await session.countAttendances({
                where: {status: 'Absent'}
            })

            const present = await session.countAttendances({
                where: {status: 'Present'}
            })
    
            const total = absent + present

            session.dataValues.absent = absent
            session.dataValues.present = present
            session.dataValues.total = total
        }

        res.status(201).json({ 
            message: "Sessions fetched successfully!",
            data: sessions
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

export async function getSession(req, res, next) {
    const sessionId = req.params.sessionId;

    try {
        const module = await Session.findByPk(sessionId, {
            include: [{
                model: Attendance, include: [Student]
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


export async function updateAttendances(req, res, next) {
    try {
        for (const student of req.body.updatedData) {
            const learnerInstance = await Student.findByPk(student.id, {
                include: {model: Grade, where: {
                    classLearningStrandId: student.classLearningStrandId
                }},
            });
            
            await learnerInstance.grades[0].update(student.grades);
        }
        
            res.status(200).json({ message: "Grade Updated!" });
        } catch (error) {
            if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        return error;
    }
}

export async function addSchedule(req, res, next) {
    const classLearningStrandId = req.params.classLearningStrandId;

    const {
        volunteer,
        days,
        start_time,
        end_time
    } = req.body

    try {
        const classLearningStrand = await ClassLearningStrand.findByPk(classLearningStrandId)
        const teacher = await Volunteer.findByPk(volunteer.id)
        await classLearningStrand.addVolunteer(teacher, {
            through: {
                days: days,
                start_time: start_time,
                end_time: end_time
            }
        });

        res.status(201).json({ 
            message: "Class schedule added!",
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

export async function updateSchedule(req, res, next) {
    try {
        const scheduleId = req.params.scheduleId
        await ClassSchedule.update(
            req.body, 
            { where: { id: scheduleId }
        });

        res.status(200).json({ message: "Status updated!" });
        } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        return error;
    }
}