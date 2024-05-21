import { validationResult } from "express-validator";
import Term from "../models/term.js";
import ClassLevel from "../models/class/class_level.js";
import LearningStrand from "../models/learning_strand.js";
import ClassLearningStrand from "../models/class/class_learning_strand.js"
import StudentRequirement from "../models/student_requirement.js";
import StudentCategory from "../models/student_category.js";

// for Academic Term Creation Operations
export async function addTerm(req, res, next) {
  const {
    academic_year,
    start_date,
    end_date,
  } = req.body;

  try {
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
    
    const term = await Term.create({
      academic_year: academic_year,
      start_date: start_date,
      end_date: end_date,
      status: true
    });
    
    res.status(201).json({ 
      message: "New Academic Term Created!"
    });

    const classLevelData = [
      {school_level: "Grade School"},
      {school_level: "Junior High School"}
    ];

    await Promise.all(
      classLevelData.map(async (class_level) => {
        await term.createClass_level(class_level)
      })
    )

    const classLevels = await ClassLevel.findAll({
      where: {termId: term.id}
    })
    const learningStrands = await LearningStrand.findAll()

    await Promise.all(
      classLevels.map(async (classLevel) => {
        learningStrands.map(async (learningStrand) => {
          await classLevel.addLearning_strand(learningStrand)
        })
      })
    )

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
        include: [{model: ClassLevel, include: [{model: ClassLearningStrand, include: [LearningStrand]}]}],
        order: [['id', 'ASC']]
      });

      res.status(200).json({
          message: "Academic Terms fetched successfully!",
          data: terms,
      });
  } catch (error) {
      if (!error.statusCode) {
          error.statusCode = 500;
      }
      next(error);
  }
}

export async function updateTerm(req, res, next) {
  const termId = req.params.termId

  try {
      await Term.update(
          req.body,
          { where: { id: termId }
      });

      res.status(200).json({ message: "Academic Term updated successfully!" });
  } catch (error) {
      if (!error.statusCode) {
          error.statusCode = 500;
      }
      next(error);
      return error;
  }
}

// for Learning Strand Creation Operations
export async function addLearningStrand(req, res, next) {
  try {
    const strand = await LearningStrand.findOne({
      where: {
        code: req.body.code,
        name: req.body.name
      }
    })

    await LearningStrand.create(req.body)

    res.status(201).json({ 
      message: "New Learning Strand Created!"
    });

    if (strand) {
      const error = new Error("Learning Strand already exists.");
      error.statusCode = 422;
      throw error;
    }
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

    res.status(200).json({ 
      message: "Learning Strands fetched successfully!",
      data: strands
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

export async function updateLearningStrand(req, res, next) {
  const strandId = req.params.strandId

  try {
      await LearningStrand.update(
          req.body,
          { where: { id: strandId }
      });

      res.status(200).json({ message: "Learning Strand updated successfully!" });
  } catch (error) {
      if (!error.statusCode) {
          error.statusCode = 500;
      }
      next(error);
      return error;
  } 
}

export async function deleteLearningStrand(req, res, next) {
  try {
    await LearningStrand.destroy({
      where: {
        id: req.params.strandId
      }
    })

    res.status(200).json({ 
      message: "Learning Strand deleted successfully!"
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

// for Student Requirement Creation Operations
export async function addRequirement(req, res, next) {
  try {
    const requirement = await StudentRequirement.findOne({
      where: {
        requirement_name: req.body.requirement_name
      }
    })
    
    await StudentRequirement.create(req.body)

    res.status(201).json({ 
      message: "New Student Requirement Created!"
    });

    if (requirement) {
      const error = new Error("Student Requirement already exists.");
      error.statusCode = 422;
      throw error;
    }
    
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

    res.status(200).json({ 
      message: "Student Requirements fetched successfully!",
      data: requirements
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

export async function updateRequirement(req, res, next) {
  const requirementId = req.params.requirementId

  try {
      await StudentRequirement.update(
          req.body,
          { where: { id: requirementId }
      });

      res.status(200).json({ message: "Student Requirement updated successfully!" });
  } catch (error) {
      if (!error.statusCode) {
          error.statusCode = 500;
      }
      next(error);
      return error;
  } 
}

export async function deleteRequirement(req, res, next) {
  try {
    await StudentRequirement.destroy({
      where: {
        id: req.params.requirementId
      }
    })

    res.status(200).json({ 
      message: "Student Requirement deleted successfully!"
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

// for Student Category Creation Operations
export async function addCategory(req, res, next) {
  try {
    const category = await StudentCategory.findOne({
      where: {
        category_name: req.body.category_name
      }
    })

    await StudentCategory.create(req.body)

    res.status(201).json({ 
      message: "New Student Category Created!"
    });

    if (category) {
      const error = new Error("Student Category already exists.");
      error.statusCode = 422;
      throw error;
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

export async function getCategories(req, res, next) {
  try {
    const categories = await StudentCategory.findAll()

    res.status(200).json({ 
      message: "Student Categories fetched successfully!",
      data: categories
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

export async function updateCategory(req, res, next) {
  const categoryId = req.params.categoryId

  try {
      await StudentCategory.update(
          req.body,
          { where: { id: categoryId }
      });

      res.status(200).json({ message: "Student Category updated successfully!" });
  } catch (error) {
      if (!error.statusCode) {
          error.statusCode = 500;
      }
      next(error);
      return error;
  }
}

export async function deleteCategory(req, res, next) {
  try {
    await StudentCategory.destroy({
      where: {
        id: req.params.categoryId
      }
    })

    res.status(200).json({ 
      message: "Student Category deleted successfully!"
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}