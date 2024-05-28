import Attendance from "../models/class/attendance.js";
import ClassLearningStrand from "../models/class/class_learning_strand.js";
import ClassSchedule from "../models/class/class_schedule.js";
import Grade from "../models/class/grade.js";
import Module from "../models/class/module.js";
import ModuleSubmission from "../models/class/module_submission.js";
import Session from "../models/class/session.js";
import Enrollment from "../models/enrollment.js";
import LearningStrand from "../models/learning_strand.js";
import ContactInfo from "../models/student/contact_info.js";
import PersonalInfo from "../models/student/personal_info.js";
import Student from "../models/student/student.js";
import Volunteer from "../models/volunteer/volunteer.js";

export async function getClassSchedules(req, res, next) {
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

        if (classLearningStrands.every(obj => !obj.dataValues.class_schedules.length)) {
            const error = new Error("No class schedules found.");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({ 
            message: "Fetched class schedules successfully!",
            data: classLearningStrands
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
        const enrollments = await Enrollment.findAll({
            where: {classLevelId: classId},
            include: [{model: Student, include: [ContactInfo, PersonalInfo]}]
        })

        if (!enrollments.length) {
            const error = new Error("No students found.");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({ 
            message: "Fetched students successfully!",
            data: enrollments
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

export async function getStudent(req, res, next) {
    const enrollmentId = req.params.enrollmentId;
    const classId = req.params.classId;

    try {
        const classLearningStrands = await ClassLearningStrand.findAll({
            where: {classLevelId: classId},
            include: [
                LearningStrand,
                {model: Grade, where: {enrollmentId: enrollmentId}},
                {model: Module, include: [{model: ModuleSubmission, where: {enrollmentId: enrollmentId}}]},
                {model: Session, include: [{model: Attendance, where: {enrollmentId: enrollmentId}}]}
            ]
        })

        res.status(200).json({ 
            message: "Fetched student successfully!",
            data: classLearningStrands
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}