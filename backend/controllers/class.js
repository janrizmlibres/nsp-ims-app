import ClassLearningStrand from "../models/class_learning_strand.js";
import ClassLevel from "../models/class_level.js";
import ClassSchedule from "../models/class_schedule.js";
import Enrollment from "../models/enrollment.js";
import LearningStrand from "../models/learning_strand.js";

export async function count(req, res, next) {
    const data = req.get("data")
    console.log(data);

    try {
        const classLevel = await ClassLevel.findByPk(data);
            console.log(classLevel)
        if (!classLevel.students) {
            const count = await classLevel.countStudent(
                {
                    where: {'$enrollment.status$': true},
                    include: [Enrollment]
                }
            )
        } else count = 0
        res.status(200).json({
        message: "Counted Students successfully.",
        count: count,
        });
    } catch (error) {
        if (!error.statusCode) {
        error.statusCode = 500;
        }
        next(error);
    }
}

export async function getClass(req, res, next) {
    const {
        classId
    } = req.body

    try {
        const classLevel = await ClassLevel.findByPk(classId);
        console.log(classLevel);
        res.status(200).json({
        message: "Fetched class successfully.",
        class: classLevel,
        });
    } catch (error) {
        if (!error.statusCode) {
        error.statusCode = 500;
        }
        next(error);
    }
}

export async function addLearningStrand(req, res, next) {
    const {
        classId,
        name,
        teacher
    } = req.body

    try {
        const classLevel = await ClassLevel.findByPk(classId);
        const learningStrand = await LearningStrand.findOne({
            where: {name:name}
        })

        const classLearningStrand = await classLevel.addLearning_strand(learningStrand, {
            through: {
                teacher: teacher
            }
        })

        res.status(201).json({ 
            message: "Learning strand added!",
            classLearningStrand: classLearningStrand
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

export async function addSchedule(req, res, next) {
    const {
        classId,
        name,
        day,
        start_time,
        end_time
    } = req.body

    try {
        const classLevel = await ClassLevel.findByPk(classId);
        const learningStrand = await LearningStrand.findOne({
            where: {name:name}
        })

        const class_learning_strand = await ClassLearningStrand.findOne({
            where: {
                classLevelId: classLevel.id,
                learningStrandId: learningStrand.id
            }
        })

        console.log(class_learning_strand);
        console.log(day);
        console.log(start_time);
        console.log(end_time);
        
        await class_learning_strand.createClass_schedule({
            day: day,
            start_time: start_time,
            end_time: end_time
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

export async function getAllStrands(req, res, next) {
    const {
        classId
    } = req.body

    try {
        const learningStrands = await ClassLearningStrand.findAll({
            where: {classLevelId: classId}, 
            include: [LearningStrand, ClassSchedule]
        })

        console.log(learningStrands);
        res.status(201).json({ 
            message: "Learning strand added!",
            learningStrands: learningStrands
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}