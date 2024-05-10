import Term from "../models/term.js";
import ClassLevel from "../models/class_level.js";
import Learner from "../models/learner.js";

export async function getActiveTerm(req, res, next) {
    try {
        const activeTerm = await Term.findOne(
            {where: { status: true },
            include: [ClassLevel]}
        );
        
        res.status(200).json({
            message: "Fetched active academic year successfully.",
            data: activeTerm,
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

export async function getTerm(req, res, next) {
    try {
        const term = await Term.findOne({
            where: {id: req.params.termId},
            include: [ClassLevel]
        })

        res.status(200).json({
            message: "Fetched academic year successfully.",
            data: term,
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

export async function getAllTerms(req, res, next) {
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
            message: "Fetched all terms successfully.",
            data: terms,
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}