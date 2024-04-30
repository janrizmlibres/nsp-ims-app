import Term from "../models/term.js";
import ClassLevel from "../models/class_level.js";
import Student from "../models/nsp_student.js"

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

export async function getAllTerms(req, res, next) {
    try {
        const terms = await Term.findAll(
            {where: {status: false}, 
            include: [{model: ClassLevel, 
                include: [Student]}]}
        );

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