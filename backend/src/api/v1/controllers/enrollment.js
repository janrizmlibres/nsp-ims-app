import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

import {
  ClassLevel,
  ClassLearningStrand,
  Session,
  Module,
} from "../models/class/index.js";

import { Term, Enrollment } from "../models/index.js";
import { Student } from "../models/student/student.js";

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
    const currentTerm = await Term.findByPk(req.params.termID);

    const classLevels = await ClassLevel.findAll({
      where: { termId: req.params.termID },
      include: { model: Student, include: { model: Enrollment } },
    });

    const parsedData = classLevels.map((classLevel) => {
      return classLevel.students.map((student) => {
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
          studentId: student.id,
          enrollmentFormURL: student.enrollment.enrollmentFormURL,
        };
      });
    });

    // Flatten the array
    const flattenedData = [].concat(...parsedData);

    res.status(200).json({
      message: "Fetched all active students successfully!",
      learners: flattenedData,
    });
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
    let index = 0;
    for (let learner of req.body.learners) {
      learner = JSON.parse(learner);

      const classLevel = await ClassLevel.findByPk(
        learner.selectedSchoolLevelId
      );

      if (!classLevel) {
        const error = new Error("Class level not found.");
        error.statusCode = 404;
        throw error;
      }

      const student = await Student.findByPk(learner.studentId);

      if (!student) {
        const error = new Error("Student not found.");
        error.statusCode = 404;
        throw error;
      }

      // Check if student is already enrolled in the current term
      const term = await Term.findByPk(learner.currentTerm, {
        include: { model: ClassLevel },
      });

      let isEnrolled = false;
      for (let i = 0; i < term.class_levels.length; i++) {
        if (await term.class_levels[i].hasStudent(student)) {
          isEnrolled = true;
          break;
        }
      }

      if (isEnrolled) {
        const error = new Error(
          `${student.lastName} is already enrolled in the current term.`
        );
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
          enrollmentFormURL:
            req.files[index] && req.files[index].path.replace("\\", "/"),
        },
      });
      index += 1;

      const classLearningStrands = await ClassLearningStrand.findAll({
        where: { classLevelId: learner.selectedSchoolLevelId },
        include: [Module, Session],
      });

      classLearningStrands.map((classLearningStrand) => {
        classLearningStrand.addEnrollment(enrollment);

        classLearningStrand.modules.map((module) => {
          module.addEnrollment(enrollment);
        });

        classLearningStrand.sessions.map((session) => {
          session.addEnrollment(enrollment);
        });
      });
    }

    res.status(201).json({
      message: "Enrolled learners successfully!",
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
    const enrollment = await Enrollment.findByPk(req.params.enrollmentId);

    if (req.files[0]) {
      const enrollmentFormURL = req.files[0]
        ? req.files[0].path.replace("\\", "/")
        : req.body.enrollmentForm;

      if (enrollmentFormURL !== enrollment.enrollmentFormURL) {
        clearEnrollmentForm(enrollment.enrollmentFormURL);
        req.body.enrollmentForm = enrollmentFormURL;
      }

      await enrollment.update({
        enrollmentFormURL: req.body.enrollmentForm,
      });
    }

    await enrollment.update({
      ftl_pretest: req.body.fltPretestScore,
      regularity: req.body.selectedRegularity.code,
      remarks: req.body.selectedRemarks,
    });

    res.status(201).json({
      message: "Updated learner enrollment successfully!",
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
    return error;
  }
};

export const getEnrolled = async (req, res, next) => {
  try {
    // Find student from student id and then include the enrollment where it is equal to the enrollmentId which also includes the class level
    const enrolledStudent = await Enrollment.findByPk(req.params.enrollmentId, {
      include: [Student, ClassLevel],
    });

    if (!enrolledStudent) {
      const error = new Error("No enrolled student found.");
      error.statusCode = 404;
      throw error;
    }

    // Parse the data to be returned in an array
    const student = {
      lrn: enrolledStudent.student.lrn,
      fullName: enrolledStudent.student.fullname,
      lastName: enrolledStudent.student.lastName,
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
      message: "Fetched enrolled student successfully!",
      enrolled: student,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
    return error;
  }
};

export const changeEnrollmentStatus = async (req, res, next) => {
  try {
    const enrollment = await Enrollment.findByPk(req.params.enrollmentId);

    await enrollment.update({
      status: req.body.statusToChange,
    });

    res.status(201).json({
      message: "Updated learner enrollment successfully!",
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
    return error;
  }
};

const clearEnrollmentForm = (filePath) => {
  if (!filePath) return;

  const __dirname = dirname(fileURLToPath(import.meta.url));
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};

export const getAllEnrollments = async (req, res, next) => {
  try {
    const enrollments = await Enrollment.findAll();
    res.status(200).json(enrollments);
  } catch (error) {
    next(error);
  }
};
