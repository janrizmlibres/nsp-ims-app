import { validationResult } from "express-validator";
import Term from "../models/term.js";
import ClassLevel from "../models/class_level.js";
import LearningStrand from "../models/learning_strand.js";
import ClassLearningStrand from "../models/class_learning_strand.js"
import StudentRequirement from "../models/student_requirement.js";

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

export async function addLearningStrand(req, res, next) {
  try {
    const strand = await LearningStrand.findOne({
      where: {
        name: req.body.name
      }
    })

    if (strand) {
      const error = new Error("Learning Strand already exists.");
      error.statusCode = 422;
      throw error;
    }
    
    await LearningStrand.create(req.body)

    res.status(201).json({ 
      message: "New Learning Strand Created!"
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
        message: "Learning Strands Fetched Successfully!", 
        data: strands
      });
  } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
  }
}

export async function addRequirement(req, res, next) {
  try {
    const requirement = await StudentRequirement.findOne({
      where: {
        requirement_name: req.body.requirement_name
      }
    })

    if (requirement) {
      const error = new Error("Student Requirement already exists.");
      error.statusCode = 422;
      throw error;
    }
    
    await StudentRequirement.create(req.body)

    res.status(201).json({ 
      message: "New Student Requirement Created!"
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

export async function getRequirements(req, res, next) {
  try {
    const requirements = await StudentRequirement.findAll()

    res.status(201).json({ 
      message: "Student Requirements Fetched Successfully!",
      data: requirements
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}