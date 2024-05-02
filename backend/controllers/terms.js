import { validationResult } from "express-validator";
import AcademicYear from "@/models/academic_year.js";

export async function createTerm(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    next(error);
  }

  const {
    batch_number,
    start_date,
    end_date,
  } = req.body;

  try {
    const term = await AcademicYear.create({
      batch_number: batch_number,
      start_date: start_date,
      end_date: end_date,
    });

    res.status(201).json({ message: "New Term Created!", termId: term.id });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}
