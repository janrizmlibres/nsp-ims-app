import { ClassLevel, ClassLearningStrand } from "../models/class/index.js";
import { Student, RequirementInfo } from "../models/student/index.js";

import {
  StudentCategory,
  LearningStrand,
  StudentRequirement,
  Term,
} from "../models/index.js";

// for Academic Term Creation Operations
export async function addTerm(req, res, next) {
  const { academic_year, start_date, end_date } = req.body;

  try {
    const activeTerm = await Term.findOne({
      where: { status: true },
    });

    if (activeTerm) {
      activeTerm.update({
        status: false,
      });
    }

    const term = await Term.create({
      academic_year: academic_year,
      start_date: start_date,
      end_date: end_date,
      status: true,
    });

    const classLevelData = [
      { school_level: "Grade School" },
      { school_level: "Junior High School" },
    ];

    for (const classLevel of classLevelData) {
      await term.createClass_level(classLevel);
    }

    const classLevels = await ClassLevel.findAll({
      where: { termId: term.id },
    });
    const learningStrands = await LearningStrand.findAll();

    for (const classLevel of classLevels) {
      for (const learningStrand of learningStrands) {
        await classLevel.addLearning_strand(learningStrand);
      }
    }

    res.status(201).json({
      message: "New Academic Term Created!",
    });
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
      include: [
        {
          model: ClassLevel,
          order: [[ClassLevel, "school_level", "ASC"]],
        },
      ],
      order: [["batch_number", "DESC"]],
    });

    for (const term of terms) {
      for (const classLevel of term.class_levels) {
        const activeCount = await classLevel.countEnrollments({
          where: {
            status: 'Active'
          }
        })

        const inactiveCount = await classLevel.countEnrollments({
          where: {
            status: 'Inactive'
          }
        })

        const dropCount = await classLevel.countEnrollments({
          where: {
            status: 'Drop'
          }
        })

        classLevel.dataValues.activeCount = activeCount
        classLevel.dataValues.inactiveCount = inactiveCount
        classLevel.dataValues.dropCount = dropCount
        classLevel.dataValues.total = activeCount + inactiveCount + dropCount
      }
    }

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
  const termId = req.params.termId;

  try {
    await Term.update(req.body, { where: { id: termId } });

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
        name: req.body.name,
      },
    });

    await LearningStrand.create(req.body);

    res.status(201).json({
      message: "New Learning Strand Created!",
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
    const strands = await LearningStrand.findAll();

    res.status(200).json({
      message: "Learning Strands fetched successfully!",
      data: strands,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

export async function updateLearningStrand(req, res, next) {
  const strandId = req.params.strandId;

  try {
    await LearningStrand.update(req.body, { where: { id: strandId } });

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
        id: req.params.strandId,
      },
    });

    res.status(200).json({
      message: "Learning Strand deleted successfully!",
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
        requirement_name: req.body.requirement_name,
      },
    });

    const newRequirement = await StudentRequirement.create(req.body);

    // add requirement info to all students
    const students = await Student.findAll();

    for (const student of students) {
      await RequirementInfo.create({
        met: false,
        studentId: student.id,
        studentRequirementId: newRequirement.id,
      });
    }

    res.status(201).json({
      message: "New Student Requirement Created!",
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
    const requirements = await StudentRequirement.findAll();

    res.status(200).json({
      message: "Student Requirements fetched successfully!",
      data: requirements,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

export async function updateRequirement(req, res, next) {
  const requirementId = req.params.requirementId;

  try {
    await StudentRequirement.update(req.body, { where: { id: requirementId } });

    // update requirement info for all students
    const newRequirementId = req.body.requirementId;
    await RequirementInfo.update(
      { studentRequirementId: newRequirementId },
      { where: { studentRequirementId: requirementId } }
    );

    res
      .status(200)
      .json({ message: "Student Requirement updated successfully!" });
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
    const requirementId = req.params.requirementId;

    // delete requirement info for all students
    await RequirementInfo.destroy({
      where: { studentRequirementId: requirementId },
    });

    await StudentRequirement.destroy({
      where: {
        id: requirementId,
      },
    });

    res.status(200).json({
      message: "Student Requirement deleted successfully!",
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
        category_name: req.body.category_name,
      },
    });

    await StudentCategory.create(req.body);

    res.status(201).json({
      message: "New Student Category Created!",
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

export async function getCategories(req, res, next) {
  try {
    const categories = await StudentCategory.findAll();

    res.status(200).json({
      message: "Student Categories fetched successfully!",
      data: categories,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

export async function updateCategory(req, res, next) {
  const categoryId = req.params.categoryId;

  try {
    await StudentCategory.update(req.body, { where: { id: categoryId } });

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
        id: req.params.categoryId,
      },
    });

    res.status(200).json({
      message: "Student Category deleted successfully!",
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}
