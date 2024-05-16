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

export async function getAllTerms(req, res, next) {
    try {
        const terms = await Term.findAll(
            {include: [ClassLevel]}
        );
        
        //sort terms by start date
        terms.sort((a, b) => {
            return new Date(a.start_date) - new Date(b.start_date);
        });

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