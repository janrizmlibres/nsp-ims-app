import Term from "../models/term.js";
import Enrollment from '../models/enrollment.js'
import ClassLevel from "../models/class_level.js";
import Student from '../models/student/student.js'

/**
 * Retrieves all learners enrolled in a term.
 * 
 * The request must contain the termID as a parameter.
 * 
 * The response will contain an array of objects, each object representing a learner.
 * The object will contain the following properties:
 * - lrn: The LRN of the learner.
 * - lastName: The last name of the learner.
 * - firstName: The first name of the learner.
 * - middleName: The middle name of the learner.
 * - schoolLevel: The school level of the learner.
 * - dateEnrolled: The date the learner was enrolled.
 * - status: The status of the learner.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 * @returns {Promise<*>}
 */
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
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
    return error;
  }
};

/**
 * Enrolls a learner to a class level.
 * 
 * The request body must contain:
 * - learnerID: The ID of the learner to be enrolled.
 * - classLevelID: The ID of the class level to enroll the learner to.
 * - hasEnrollmentForm: A boolean value indicating if the learner has an enrollment form.
 * - digital_literacy: The digital literacy score of the learner.
 * - ftl_pretest: The FTL pretest score of the learner.
 * - callable: A boolean value indicating if the learner is callable.
 * - bridger: A boolean value indicating if the learner is a bridger.
 * - modularity: The modularity of the learner.
 * - remarks: Additional remarks about the learner.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 * @returns {Promise<*>}
 */
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