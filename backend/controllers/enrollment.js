import Term from "../models/term.js";
import Enrollment from '../models/enrollment.js'
import ClassLevel from "../models/class/class_level.js";
import ClassLearningStrand from '../models/class/class_learning_strand.js'
import ModuleSubmission from '../models/class/module_submission.js'
import Session from '../models/class/session.js'
import Module from '../models/class/module.js'
import Student from '../models/student/student.js'
import Grade from '../models/class/grade.js'
import Attendance from '../models/class/attendance.js'

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
          classLevelId: classLevel.id,
          enrollmentId: student.enrollment.id,
          studentId: student.id
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
export const enrollLearners = async (req, res, next) => {
  try {
    for (const learner of req.body.learners) {
      const classLevel = await ClassLevel.findByPk(learner.selectedSchoolLevelId);

      if (!classLevel) {
        const error = new Error("Class level not found.");
        error.statusCode = 404;
        throw error;
      }

      const student = await Student.findByPk(learner.studentId)

      if (!student) {
        const error = new Error("Student not found.");
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

      const enrollment = await classLevel.addStudent(student, {
        through: {
          ftl_pretest: learner.fltPretestScore,
          dateEnrolled: new Date(),
          status: "Active",
          regularity: learner.selectedRegularity,
          remarks: learner.selectedRemarks,
        }
      });

      const classLearningStrands = await ClassLearningStrand.findAll({
        where: {classLevelId: learner.selectedSchoolLevelId},
        include: [Module, Session]
      })

      classLearningStrands.map(classLearningStrand => {
        classLearningStrand.addEnrollment(enrollment)

        classLearningStrand.modules.map(module => {
          module.addEnrollment(enrollment)
        })

        classLearningStrand.sessions.map(session => {
          session.addEnrollment(enrollment)
        })
      })
    }

    res.status(201).json({
      message: 'Enrolled learners successfully!'
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
  try {
    const enrollment = await Enrollment.findByPk(req.params.enrollmentId)
    
    await enrollment.update({ 
      hasEnrollmentForm: req.body.hasEnrollmentForm,
      digital_literacy: req.body.digitalLiteracyScore,
      ftl_pretest: req.body.fltPretestScore,
      callable: req.body.callable,
      bridger: req.body.bridger,
      regularity: req.body.selectedRegularity.code,
      remarks: req.body.selectedRemarks, 
    })
    
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
    // Find student from student id and then include the enrollment where it is equal to the enrollmentId which also includes the class level
    const enrolledStudent = await Enrollment.findByPk(
      req.params.enrollmentId, {
      include: [ Student, ClassLevel ]
    })
    
    if (!enrolledStudent) {
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
    
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
    return error;
  }
}

export const changeEnrollmentStatus = async (req, res, next) => {
  try {
    const enrollment = await Enrollment.findByPk(req.params.enrollmentId)
    
    await enrollment.update({
      status: req.body.statusToChange
    })
    
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

export const getEnrolledModules = async (req, res, next) => {
  try {
    const classLearningStrand = await ClassLearningStrand.findOne({
      where: { id: req.params.classLearningStrandId },
      include: [
        {
          model: Module,
          include: [
            {
              model: ModuleSubmission,
              where: { enrollmentId: req.params.enrollmentId }
            }
          ]
        }
      ]
    });
    
    if (!classLearningStrand) {
      const error = new Error("No enrolled modules found.");
      error.statusCode = 404;
      throw error;
    }
    
    const modules = classLearningStrand.modules.map(module => {
      return {
        title: module.title,
        status: module.module_submissions[0].status,
        remarks: module.module_submissions[0].remarks,
        dateSubmitted: module.module_submissions[0].date_submitted,
        distributionDate: module.distribution_date
      };
    });
    
    res.status(200).json({
      message: 'Fetched enrolled modules successfully!',
      modules: modules
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
    return error;
  }
}

export const getEnrolledGrades = async (req, res, next) => {
  try {
    const grade = await Grade.findOne({
      where: { enrollmentId: req.params.enrollmentId, classLearningStrandId: req.params.classLearningStrandId }
    });
    
    const grades = [
      {
        firstQuarter: grade.first_quarter,
        secondQuarter: grade.second_quarter,
        thirdQuarter: grade.third_quarter,
        fourthQuarter: grade.fourth_quarter,
        remarks: grade.remarks
      }
    ]
    
    res.status(200).json({
      message: 'Fetched enrolled grades successfully!',
      grades: grades
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
    return error;
  }
}

export const getEnrolledAttendance = async (req, res, next) => {
  try {
    const classLearningStrand = await ClassLearningStrand.findOne({
      where: { id: req.params.classLearningStrandId },
      include: [
        {
          model: Session,
          include: [
            {
              model: Attendance,
              where: { enrollmentId: req.params.enrollmentId }
            }
          ]
        }
      ]
    });
    
    const attendance = classLearningStrand.sessions.map(session => {
      return {
        sessionDate: session.date,
        status: session.attendances[0].status,
        remarks: session.attendances[0].remarks
      };
    });

    console.log(attendance)

    res.status(200).json({
      message: 'Fetched enrolled modules successfully!',
      attendance: attendance
    });
    
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
    return error;
  }
}