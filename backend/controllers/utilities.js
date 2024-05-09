import { validationResult } from "express-validator";
import Term from "../models/term.js";
import ClassLevel from "../models/class_level.js";
import LearningStrand from "../models/learning_strand.js";
import ClassLearningStrand from "../models/class_learning_strand.js"

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

    const classLevels = await ClassLevel.findAll({
      where: {termId: term.id}
    })

    const learningStrands = await LearningStrand.findAll()
    for (const classLevel of classLevels) {
      for (const learningStrand of learningStrands) {
        classLevel.addLearning_strand(learningStrand)
      }
    }

    res.status(201).json({ message: "New Academic Term Created!" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

export async function getTerms(req, res, next) {
  try {
      const terms = await Term.findAll({
        include: [{model: ClassLevel, include: [ClassLearningStrand]}],
        order: [['id', 'ASC']]
      });

      res.status(200).json({
          message: "Academic Terms Fetched Successfully!",
          data: terms,
      });
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
