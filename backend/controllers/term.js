import Term from "../models/term.js";
import ClassLevel from "../models/class_level.js";

export async function active_year(req, res, next) {
    try {
        const active_year = await Term.findOne(
            {   where: { status: true },
                include: [{
                    model: ClassLevel
                }] 
            }
        );
        
        res.status(200).json({
            message: "Fetched active academic year successfully.",
            data: active_year,
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

export async function add_class(req, res, next) {
    const {
        school_level,
    } = req.body;

    try {
        const active_year = await Term.findOne(
            { where: { status: true } }
        );
        
        await active_year.createClass_level({
            school_level: school_level
        });

        res.status(201).json({ 
            message: "Class created!"
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}