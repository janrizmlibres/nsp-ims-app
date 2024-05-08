import Term from "../models/term.js";
import Enrollment from '../models/enrollment.js'
import ClassLearningStrand from "../models/class_level.js";
import ClassLevel from "../models/class_level.js";
import Learner from "../models/learner.js";

export const getAllCurrentEnrolled = async (req, res, next) => {
  const termID = req.params.termID
  
  try {
    const currentTerm = await Term.findByPk(
      termID
    )

    const classLevels = await ClassLevel.findAll({
      where: { termId: currentTerm.id }
    });

    // Get all enrollments for the current term
    const enrollments = await Enrollment.findAll({
      where: { classLevelId: classLevels.map(cl => cl.id) },
      include: [
        {
          model: Learner,
          attributes: ['lrn', 'firstName', 'lastName', 'middleName']
        },
        {
          model: ClassLevel,
          attributes: ['school_level'],
          include: [
            {
              model: ClassLearningStrand,
              attributes: ['id'] // Assuming this is the class code
            }
          ]
        }
      ]
    });

    // Format the data
    const students = enrollments.map(enrollment => ({
      LRN: enrollment.Learner.lrn,
      fullName: `${enrollment.Learner.firstName} ${enrollment.Learner.middleName} ${enrollment.Learner.lastName}`,
      schoolLevel: enrollment.ClassLevel.school_level,
      classCode: enrollment.ClassLevel.ClassLearningStrands[0].id,
      dateEnrolled: enrollment.dateEnrolled
    }));
    
    res.status(200).json({
      message: "Fetched all students successfully.",
      data: students,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching students.' });
    
    next(error)
  }
};