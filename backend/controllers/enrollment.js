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
  try {
    const currentTerm = await Term.findByPk(
      req.params.termID
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
          fullName: student.fullname,
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
  try {
    //search for the Student ID from its lrn field
    const student = await Student.findOne(
      {where: {lrn: lrn}}
    )
    
    if (!student) {
      const error = new Error("Student not found.");
      error.statusCode = 404;
      throw error;
    }
    
    const classLevel = await ClassLevel.findByPk(classLevelID);
    
    if (!classLevel) {
      const error = new Error("Class level not found.");
      error.statusCode = 404;
      throw error;
    }
    
    // Check if student is already enrolled in the class level
    const isEnrolled = await classLevel.hasStudent(student);
    
    if (isEnrolled) {
      const error = new Error("Student is already enrolled in this year class level.");
      error.statusCode = 400;
      throw error;
    }
    
    await classLevel.addStudent(student, {
      through: {
        hasEnrollmentForm: req.body.hasEnrollmentForm,
        digital_literacy: req.body.digitalLiteracyScore,
        ftl_pretest: req.body.fltPretestScore,
        callable: req.body.callable,
        bridger: req.body.bridger,
        dateEnrolled: new Date(),
        status: "Active",
        regularity: req.body.selectedRegularity,
        remarks: req.body.selectedRemarks,
      }
    });
    
    res.status(201).json({ 
      message: 'Enrolled learner successfully!' 
    });

  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
    return error;
  }
};

export const updateEnrollment = async (req, res, next) => {
  const { 
    lrn, 
    classLevelID, 
    hasEnrollmentForm, 
    digital_literacy, 
    ftl_pretest, 
    callable, 
    bridger,
    regularity, 
    remarks 
  } = req.body;
  
  try {
    //search for the Student ID from its lrn field
    const student = await Student.findOne(
      {where: {lrn: lrn}}
    )
    
    if (!student) {
      const error = new Error("Student not found.");
      error.statusCode = 404;
      throw error;
    }
    
    const classLevel = await ClassLevel.findByPk(classLevelID);
    
    if (!classLevel) {
      const error = new Error("Class level not found.");
      error.statusCode = 404;
      throw error;
    }
    
    // Check if student is already enrolled in the class level
    const isEnrolled = await classLevel.hasStudent(student);
    
    if (!isEnrolled) {
      const error = new Error("Student is not enrolled in this year class level.");
      error.statusCode = 400;
      throw error;
    }
    
    await enrollment.update(
      {
        hasEnrollmentForm: req.body.hasEnrollmentForm,
        digital_literacy: req.body.digitalLiteracyScore,
        ftl_pretest: req.body.fltPretestScore,
        callable: req.body.callable,
        bridger: req.body.bridger,
        regularity: req.body.selectedRegularity.code,
        remarks: req.body.selectedRemarks,
      }
    )
    
    res.status(201).json({ 
      message: 'Updated learner enrollment successfully!' 
    });

  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
    return error;
  }
}

export const getEnrolled = async (req, res, next) => {
  try {
    const chosenTerm = await Term.findOne({
      where: {academic_year: academicYear}
    })
    
    const classLevels = await ClassLevel.findAll({
      where: {termId: chosenTerm.id, school_level: classLevel},
      include: {model: Student, where: {lrn: lrn}, include: {model: Enrollment}},
    })
    
    if (classLevels.length === 0) {
      const error = new Error("No enrolled student found.");
      error.statusCode = 404;
      throw error;
    }
    
    // Parse the data to be returned in an array
    const student = {
      lrn: enrolledStudent.student.lrn,
      fullName: enrolledStudent.student.fullname,
      schoolLevel: enrolledStudent.class_level,
      regularity: enrolledStudent.regularity,
      remarks: enrolledStudent.remarks,
      digitalLiteracy: enrolledStudent.digital_literacy,
      ftlPretest: enrolledStudent.ftl_pretest,
      hasEnrollmentForm: enrolledStudent.hasEnrollmentForm,
      callable: enrolledStudent.callable,
      Bridger: enrolledStudent.bridger,
    };
    
    res.status(200).json({
      message: 'Fetched enrolled student successfully!',
      enrolled: student
    });
    
    // Flatten the array
    const flattenedData = [].concat(...parsedData);
    
    res.status(200).json({ message: 'Fetched enrolled student successfully!', enrolled: flattenedData });
    
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
    return error;
  }
}

export const changeEnrollmentStatus = async (req, res, next) => {
  const {
    lrn,
    academicYear,
    classLevel,
    statusToChange
  } = req.body;

  try {
    //search for the Student ID from its lrn field
    const student = await Student.findOne(
      {where: {lrn: lrn}}
    )

    if (!student) {
      const error = new Error("Student not found.");
      error.statusCode = 404;
      throw error;
    }

    const chosenTerm = await Term.findOne({
      where: {academic_year: academicYear}
    })

    const chosenClassLevel = await ClassLevel.findOne({
      where: {termId: chosenTerm.id, school_level: classLevel},
      include: {model: Student, where: {lrn: lrn}},
    })

    // Check if student is already enrolled in the class level
    const isEnrolled = await chosenClassLevel.hasStudent(student);

    if (!isEnrolled) {
      const error = new Error("Student is not enrolled in this year class level.");
      error.statusCode = 400;
      throw error;
    }

    await chosenClassLevel.addStudent(student, {
      through: {
        status: statusToChange
      }
    });

    res.status(201).json({
      message: 'Updated learner enrollment successfully!'
    });

  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
    return error;
  }
}