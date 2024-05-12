import Term from "../models/term.js";
import Enrollment from '../models/enrollment.js'
import ClassLevel from "../models/class_level.js";
import Student from '../models/student/student.js'

export const getAllEnrolledOnTerm = async (req, res, next) => {
  const termID = req.params.termID
  
  try {
    const currentTerm = await Term.findByPk(
      termID
    )

    const classLevels = await ClassLevel.findAll({
      where: {termId: currentTerm.id},
      include: {model: Student, include: {model: Enrollment}},
    })

    const parsedData = classLevels.map(classLevel => {
      return classLevel.students.map(student => {
        return {
          lrn: student.lrn,
          lastName: student.lastName,
          firstName: student.firstName,
          middleName: student.middleName,
          schoolLevel: classLevel.school_level,
          dateEnrolled: student.enrollment.dateEnrolled,
          status: student.enrollment.status,
          term: currentTerm.academic_year,
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

export const enrollLearner = async (req, res, next) => {
  const { learnerID, classLevelID, modularity, remarks } = req.body;
  
  try {
    const learner = await Learner.findByPk(learnerID);
    const classLevel = await ClassLevel.findByPk(classLevelID);

    const enrollment = await Enrollment.create({
      learnerId: learnerID,
      classLevelId: classLevelID,
      modularity: modularity,
      remarks: remarks,
      dateEnrolled: new Date(),
      status: 'Active'
    });

    res.status(201).json({ message: 'Enrolled learner successfully!', enrollment: enrollment });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while enrolling the learner.' });
    next(error);
  }
};