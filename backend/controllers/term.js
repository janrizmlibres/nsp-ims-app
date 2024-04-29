import Term from "../models/term.js";
import ClassLevel from "../models/class_level.js";
import Student from "../models/nsp_student.js"

export async function getActiveTerm(req, res, next) {
    try {
        const activeTerm = await Term.findOne(
            {   where: { status: true },
                include: [{
                    model: ClassLevel
                }] 
            }
        );
        
        res.status(200).json({
            message: "Fetched active academic year successfully.",
            activeTerm: activeTerm,
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
            where: {
                status: false
            }, include: [{
                model: ClassLevel, include: [Student]
            }]
        });
        res.status(200).json({
            message: "Fetched all terms successfully.",
            terms: terms,
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

export async function addClass(req, res, next) {
    const {
        school_level,
    } = req.body;

    try {
        const active_year = await Term.findOne(
            { where: { status: true } }
        );
        
        const new_class = await active_year.createClass_level({
            school_level: school_level
        });

        res.status(201).json({ 
            message: "Class created!",
            new_class: new_class
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}