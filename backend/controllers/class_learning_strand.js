import Attendance from "../models/class/attendance.js";
import ClassLearningStrand from "../models/class/class_learning_strand.js";
import ClassSchedule from "../models/class/class_schedule.js";
import Enrollment from "../models/enrollment.js";
import Grade from "../models/class/grade.js";
import LearningStrand from "../models/learning_strand.js";
import Module from "../models/class/module.js";
import Session from "../models/class/session.js";
import Student from "../models/student/student.js";
import Volunteer from "../models/volunteer/volunteer.js";
import ModuleSubmission from "../models/class/module_submission.js";
import { Op } from "sequelize";

export async function addModule(req, res, next) {
    const classLearningStrandId = req.params.classLearningStrandId;

    const {
        min,
        max,
        distriDate,
        retriDate
    } = req.body

    try {
        const classLearningStrand = await ClassLearningStrand.findByPk(classLearningStrandId)

        const titles = []

        for(let i = min; i < max+1; i++) {
            titles.push("LAS " + i)
        }

        const modules = await Module.findAll({
            where: {title: {[Op.in]: titles}, classLearningStrandId: classLearningStrandId}
        })

        if (modules.length) {
            const error = new Error("Module(s) exist(s) already!");
            error.statusCode = 404;
            throw error;
        }

        const enrollments = await Enrollment.findAll({
            where: {classLevelId: classLearningStrand.classLevelId}
        })

        titles.map(async title => {
            const module = await classLearningStrand.createModule({
                title: title,
                distribution_date: distriDate,
                retrieval_date: retriDate
            })

            for (const enrollment of enrollments) {
                const module_submission = await module.addEnrollment(enrollment)
                console.log(module_submission);
            }
        })

        res.status(201).json({ 
            message: "Learning activity sheets added!"
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
                model: ModuleSubmission, include: [{model: Enrollment, include:[Student]}]
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

export async function updateModuleStatus(req, res, next) {
    const { status, moduleIds } = req.body

    try {
        await Module.update(
            { status: !status },
            { where: { id: moduleIds }
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

export async function deleteModules(req, res, next) {
    const { moduleIds } = req.body

    try {
        await Module.destroy({
            where: { id: moduleIds }
        })

        res.status(200).json({ message: "Deleted Modules Successfully!" });
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
                model: Enrollment, where: {classLevelId: classLearningStrand.classLevelId}, include: [Student]
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
        for (const enrollment of req.body.updatedData) {
            const enrollmentInstance = await Enrollment.findByPk(enrollment.enrollmentId, {
                include: {model: Grade, where: {
                    classLearningStrandId: enrollment.classLearningStrandId
                }},
            });

            await enrollmentInstance.grades[0].update(enrollment.grades);
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
        dates,
    } = req.body

    try {
        const sesh = await Session.findAll({
            where: {date: {[Op.in]: dates}, classLearningStrandId: classLearningStrandId}
        })
    
        if (sesh.length) {
            const error = new Error("Session(s) exist(s) already!");
            error.statusCode = 404;
            throw error;
        }

        const classLearningStrand = await ClassLearningStrand.findByPk(classLearningStrandId)

        const enrollments = await Enrollment.findAll({
            where: {classLevelId: classLearningStrand.classLevelId}, 
            include: [Student]
        })

        for (const date of dates) {
            const session = await classLearningStrand.createSession({
                date: date,
            })

            for (const enrollment of enrollments) {
                await session.addEnrollment(enrollment)
            }
        }

        res.status(201).json({ 
            message: "Session(s) added!"
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
        const classLearningStrand = await ClassLearningStrand.findOne({
            include: [{model: Session, where: {
                '$sessions.id$': sessionId
            }}, LearningStrand]
        })
        
        const regularAttendances = await Attendance.findAll({
            where: {
                '$enrollment.regularity$': 'Regular',
            }, include: [{model: Enrollment, include: [Student]}]
        })

        const hybridAttendances = await Attendance.findAll({
            where: {
                '$enrollment.regularity$': 'Hybrid',
            }, include: [{model: Enrollment, include: [Student]}]
        })
        
        res.status(200).json({
        message: "Fetched module successfully.",
        data: {
            classLearningStrand: classLearningStrand,
            session: classLearningStrand.sessions[0],
            attendances: {
                regular: regularAttendances,
                hybrid: hybridAttendances
            }
        },
        });
    } catch (error) {
        if (!error.statusCode) {
        error.statusCode = 500;
        }
        next(error);
    }
}

export async function updateSession(req, res, next) {
    const sessionId = req.params.sessionId

    try {
        await Session.update({
            remarks: req.body.remarks
        }, {
            where: {id: sessionId},
        })
        
            res.status(200).json({ message: "Session Updated!" });
        } catch (error) {
            if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        return error;
    }
}

export async function deleteSessions(req, res, next) {
    const { sessionIds } = req.body

    try {
        await Session.destroy({
            where: { id: sessionIds }
        })

        res.status(200).json({ message: "Deleted Sessions Successfully!" });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        return error;
    } 
}

export async function updateAttendances(req, res, next) {
    try {
        for (const attendance of req.body.updatedData) {
            const attendanceInstance = await Attendance.findByPk(attendance.id);

            await attendanceInstance.update({
                status: attendance.status,
                remarks: attendance.remarks
            });
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