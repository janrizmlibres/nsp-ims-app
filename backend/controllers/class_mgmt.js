import Class from "../models/class.js";
import AcademicYear from "../models/academic_year.js";
import ClassSchedule from "../models/class_learning_strand.js";
import LearningStrand from "../models/learning_strand.js";
import { LearningStrand_Class } from "../util/relations.js"

export async function createClass(req, res, next) {
    const {
        schoolLevel,
        academic_year,
    } = req.body;

    try {
        const acadClass = await Class.create(
            {
                schoolLevel: schoolLevel,
                academic_year: academic_year
            },
            {
                include: [AcademicYear]
            }
        );

        res.status(201).json({ message: "Class created!", classId: acadClass.id });
    } catch (error) {
        if (!error.statusCode) {
        error.statusCode = 500;
        }
        next(error);
    }
}

export async function assignLearningStrand(req, res, next) {
    const {
        code,
        name,
        schoolLevel,
    } = req.body;

    try {
        const learningStrand = await LearningStrand.create({
        code: code,
        name: name,
        class: {
            schoolLevel: schoolLevel
        },
        class_schedule: {

        },
        include: [
            {
                association: LearningStrand_Class
            }
        ]
        });

        res.status(201).json({ message: "Learning strand assigned!", classId: learningStrand.id });
    } catch (error) {
        if (!error.statusCode) {
        error.statusCode = 500;
        }
        next(error);
    }
}

export async function createClassSchedule(req, res, next) {
    const {
        day,
        time
    } = req.body;

    try {
        const classSchedule = await ClassSchedule.create({
        day: day,
        time: time
        });

        res.status(201).json({ message: "Learning strand assigned!", classId: classSchedule.id });
    } catch (error) {
        if (!error.statusCode) {
        error.statusCode = 500;
        }
        next(error);
    }
}