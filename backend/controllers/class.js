import ClassLearningStrand from "../models/class_learning_strand.js";
import ClassLevel from "../models/class_level.js";
import ClassSchedule from "../models/class_schedule.js";
import Enrollment from "../models/enrollment.js";
import Learner from "../models/learner.js";
import LearningStrand from "../models/learning_strand.js";
import Module from "../models/module.js";
import Term from "../models/term.js"

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

export async function addLearningStrand(req, res, next) {
    const classId = req.params.classId;

    const {
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
            data: classLearningStrand
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

export async function addSchedule(req, res, next) {
    const classId = req.params.classId;

    const {
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
    const classId = req.params.classId;

    try {
        const learningStrands = await ClassLearningStrand.findAll({
            where: {classLevelId: classId}, 
            include: [LearningStrand, ClassSchedule]
        })

        res.status(201).json({ 
            message: "Learning strand added!",
            data: learningStrands
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
        const classLevel = await ClassLevel.findByPk(classId, {
            include: {model: ClassLearningStrand, include: [Module]}
        })
        
        const modules = []
        classLevel.class_learning_strands.forEach(learningStrand => {
            modules.push(...learningStrand.modules)
        });

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
        const activeStudents = await ClassLevel.findByPk(classId, {
            include: {model: Enrollment, 
                where: {
                    status: 'Active'
                },
                include: [Learner]}
        })

        const inactiveStudents = await ClassLevel.findByPk(classId, {
            include: {model: Enrollment, 
                where: {
                    status: 'Inactive'
                },
                include: [Learner]}
        })

        const dropStudents = await ClassLevel.findByPk(classId, {
            include: {model: Enrollment, 
                where: {
                    status: 'Drop'
                },
                include: [Learner]}
        })

        res.status(201).json({ 
            message: "Fetched all modules successfully!",
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