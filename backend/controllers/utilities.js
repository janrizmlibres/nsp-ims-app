import { validationResult } from "express-validator";
import Term from "../models/term.js";
import LearningStrand from "../models/learning_strand.js";

export async function addTerm(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    next(error);
  }

  const {
    academic_year,
    start_date,
    end_date,
  } = req.body;

  try {
    const term = await Term.create({
      academic_year: academic_year,
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

export async function getLearningStrands(req, res, next) {
  try {
      const strands = await LearningStrand.findAll()

      res.status(201).json({ 
        message: "New Term Created!", 
        data: strands
      });
  } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
  }
}
