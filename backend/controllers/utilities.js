import { validationResult } from "express-validator";
import Term from "../models/term.js";
import LearningStrand from "../models/learning_strand.js";

export async function addTerm(req, res, next) {
  const {
    academic_year,
    start_date,
    end_date,
  } = req.body;

  const termTemp = await Term.findOne({
    where: {academic_year: academic_year}
  })

  if (termTemp) {
    const error = new Error("Academic Term already exists.");
    error.statusCode = 422;
    throw error;
  }

  const activeTerm = await Term.findOne({
    where: {status: true}
  })

  if (activeTerm) {
    activeTerm.update({
      status: false
    })
  }

  try {
    const term = await Term.create({
      academic_year: academic_year,
      start_date: start_date,
      end_date: end_date,
      status: true
    });

    const classLevelData = [
      {
        school_level: "Grade School",
      },
      {
        school_level: "Junior High School",
      },
    ];

    classLevelData.map(async (class_level) => {
      await term.createClass_level({
        school_level: class_level.school_level
      });
    })

    res.status(201).json({ message: "New Academic Term Created!" });
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
