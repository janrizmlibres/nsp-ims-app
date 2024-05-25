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
import Term from "../models/term.js"
import { Op } from "sequelize";
import ClassLevel from "../models/class/class_level.js";

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

        const enrollments = await Enrollment.findAll({
            where: {classLevelId: classLearningStrand.classLevelId}
        })

        for (const title of titles) {
            await classLearningStrand.createModule({
                title: title,
                distribution_date: distriDate,
                retrieval_date: retriDate
            }).then(async (module) => {
                for (const enrollment of enrollments) {
                    await module.addEnrollment(enrollment)
                }
            })
        }

        res.status(201).json({ 
            message: "Added learning activity sheets successfully!"
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
    
            const submitted = await module.countModule_submissions({
                where: {status: 'Submitted'}
            })
    
            const graded = await module.countModule_submissions({
                where: {status: 'Graded'}
            })
    
            const total = noSubmissions + submitted + graded

            module.dataValues.noSubmissions = noSubmissions
            module.dataValues.submitted = submitted
            module.dataValues.graded = graded
            module.dataValues.total = total
        }

        res.status(201).json({ 
            message: "Fetched modules successfully!",
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
            include: [
                {model: ModuleSubmission, 
                    include: [
                        {model: Enrollment, 
                            include:[Student]
                        }
                    ]
                }, 
                {model: ClassLearningStrand, include: [
                    {model: ClassLevel, 
                        include: [Term]
                }, LearningStrand]}
            ]
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
        await Module.update(req.body, {
            where: { id: moduleId }
        });

        res.status(200).json({ 
            message: "Updated module successfully!" 
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    } 
}

export async function updateModuleStatus(req, res, next) {
    const { status, moduleIds } = req.body

    try {
        await Module.update(
            { status: !status },
            { where: { id: moduleIds }
        });

        res.status(200).json({ 
            message: "Updated module statuses successfully!" 
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    } 
}

export async function deleteModules(req, res, next) {
    const { moduleIds } = req.body

    try {
        await Module.destroy({
            where: { id: moduleIds }
        })

        res.status(200).json({ 
            message: "Deleted modules successfully!" 
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    } 
}

export async function updateModuleSubmissions(req, res, next) {
    try {
        for (const moduleSubmission of req.body.updatedData) {
            const moduleSubmissionInstance = await ModuleSubmission.findByPk(moduleSubmission.id);

            await moduleSubmissionInstance.update({
                status: moduleSubmission.status,
                date_submitted: moduleSubmission.date_submitted,
                score: moduleSubmission.score,
                remarks: moduleSubmission.remarks
            });
        }

        res.status(200).json({ 
            message: "Updated module submissions successfully!" 
        });
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
            include: [
                {model: Enrollment, 
                    where: {classLevelId: classLearningStrand.classLevelId}, 
                    include: [Student]
                }, 
                {model: ClassLearningStrand, include: [LearningStrand]}
            ]
        })

        res.status(201).json({ 
            message: "Fetched grades successfully!",
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
                include: [
                    {model: Grade, 
                        where: {classLearningStrandId: enrollment.classLearningStrandId}
                    }
                ],
            });

            await enrollmentInstance.grades[0].update(enrollment.grades);
        }
        
        res.status(200).json({ 
            message: "Updated grade successfully!" 
        });
        } catch (error) {
            if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

export async function addSession(req, res, next) {
    const classLearningStrandId = req.params.classLearningStrandId;

    const { dates } = req.body

    try {
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
            message: "Added sessions successfully!"
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
            where: {classLearningStrandId: classLearningStrandId}
        })

        for (const session of sessions) {
            const absent = await session.countAttendances({
                where: {status: 'Absent'},
                include: [
                    {model: Enrollment, 
                        where: {status: {[Op.not]: 'Drop'}}
                    }
                ]
            })

            const present = await session.countAttendances({
                where: {status: 'Present'},
                include: [
                    {model: Enrollment, 
                        where:{status: {[Op.not]: 'Drop'}}
                    }
                ]
            })
    
            const total = absent + present

            session.dataValues.absent = absent
            session.dataValues.present = present
            session.dataValues.total = total
        }

        res.status(201).json({ 
            message: "Fetch sessions successfully!",
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
            include: [
                {model: Session, 
                    where: {'$sessions.id$': sessionId}
                }, 
                LearningStrand, 
                {model: ClassLevel,
                    include: [Term]
                }
            ]
        })
        
        const regularAttendances = await Attendance.findAll({
            where: {
                sessionId: sessionId,
                '$enrollment.regularity$': 'Regular',
                '$enrollment.status$': {[Op.not]: 'Drop'}
            }, 
            include: [
                {model: Enrollment, 
                    include: [Student]
                }
            ]
        })

        const hybridAttendances = await Attendance.findAll({
            where: {
                sessionId: sessionId,
                '$enrollment.regularity$': 'Hybrid',
                '$enrollment.status$': {[Op.not]: 'Drop'}
            }, 
            include: [
                {model: Enrollment, 
                    include: [Student]
                }
            ]
        })

        const dropAttendances = await Attendance.findAll({
            where: {
                sessionId: sessionId,
                '$enrollment.status$': 'Drop'
            }, 
            include: [
                {model: Enrollment, 
                    include: [Student]
                }
            ]
        })
        
        res.status(200).json({
            message: "Fetched session successfully.",
            data: {
                classLearningStrand: classLearningStrand,
                session: classLearningStrand.sessions[0],
                attendances: {
                    regular: regularAttendances,
                    hybrid: hybridAttendances,
                    drop: dropAttendances
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
        await Session.update(
            {remarks: req.body.remarks}, 
            {where: {id: sessionId}}
        )
        
        res.status(200).json({ 
            message: "Updated session successfully!" 
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

export async function deleteSessions(req, res, next) {
    const { sessionIds } = req.body

    try {
        await Session.destroy({
            where: { id: sessionIds }
        })

        res.status(200).json({ message: "Deleted sessions successfully!" });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
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
        
            res.status(200).json({ 
                message: "Updated attendances successfully!" 
            });
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

    console.log(req.body);
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
            message: "Added class schedule successfully!",
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
        await ClassSchedule.update(req.body, { 
            where: { id: scheduleId }
        });

        res.status(200).json({ 
            message: "Updated class schedule successfully!" 
        });
        } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        return error;
    }
}

export async function deleteSchedules(req, res, next) {
    const { scheduleIds } = req.body

    try {
        await ClassSchedule.destroy({
            where: { id: scheduleIds }
        })

        res.status(200).json({ 
            message: "Deleted class schedules successfully!" });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    } 
}