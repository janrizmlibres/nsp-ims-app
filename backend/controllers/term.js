import AcademicYear from "../models/academic_year.js";

export async function getActiveYear(req, res, next) {
    try {
        const active_year = await AcademicYear.findOne(
            { where: { status: true } }
        );
        
        console.log(active_year)
        res.status(200).json({
            message: "Fetched active academic year successfully.",
            active_year: {
                batch_number: active_year.batch_number,
                academic_year: active_year.academic_year,
                start_date: active_year.start_date,
                end_date: active_year.end_date
            },
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}