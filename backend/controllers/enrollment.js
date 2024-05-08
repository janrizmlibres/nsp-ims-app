import Term from "../models/term.js";
import Enrollment from '../models/enrollment.js'
import ClassLevel from "../models/class_level.js";
import Learner from "../models/learner.js";

export const getAllCurrentEnrolled = async (req, res, next) => {
  const termID = req.params.termID
  
  try {
    const currentTerm = await Term.findByPk(
      termID
    )

    const classLevels = await ClassLevel.findAll({
      where: {termId: currentTerm.id},
      include: {model: Learner, include: {model: Enrollment}},
    })

    const parsedData = classLevels.map(classLevel => {
      return classLevel.learners.map(learner => {
        return {
          lrn: learner.lrn,
          lastName: learner.lastName,
          firstName: learner.firstName,
          middleName: learner.middleName,
          schoolLevel: classLevel.school_level,
          dateEnrolled: learner.enrollment.dateEnrolled,
          status: learner.enrollment.status
        };
      });
    });

    // Flatten the array
    const flattenedData = [].concat(...parsedData);

    res.status(200).json({ message: 'Fetched all active students successfully!', learners: flattenedData });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching students.' });
    next(error);
  }
};