import {
  Attendance,
  ClassLearningStrand,
  ClassSchedule,
  Grade,
  Module,
  ModuleSubmission,
  Session,
} from "../models/class/index.js";

import { Enrollment, LearningStrand } from "../models/index.js";
import { Student, ContactInfo, PersonalInfo } from "../models/student/index.js";
import { Volunteer } from "../models/volunteer/volunteer.js";

export async function getClassSchedules(req, res, next) {
  const classId = req.params.classId;

  try {
    const classLearningStrands = await ClassLearningStrand.findAll({
      where: { classLevelId: classId },
      include: [
        LearningStrand,
        {
          model: ClassSchedule,
          include: [Volunteer],
        },
      ],
      order: [[LearningStrand, "code", "ASC"]],
    });

    if (
      classLearningStrands.every(
        (obj) => !obj.dataValues.class_schedules.length
      )
    ) {
      const error = new Error("No class schedules found.");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      message: "Fetched class schedules successfully!",
      data: classLearningStrands,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

export async function getAllStudents(req, res, next) {
  const classId = req.params.classId;

  try {
    const enrollments = await Enrollment.findAll({
      where: { classLevelId: classId },
      include: [{ model: Student, include: [ContactInfo, PersonalInfo] }],
    });

    if (!enrollments.length) {
      const error = new Error("No students found.");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      message: "Fetched students successfully!",
      data: enrollments,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

export async function getStudent(req, res, next) {
  const enrollmentId = req.params.enrollmentId;
  const classId = req.params.classId;

  try {
    const classLearningStrands = await ClassLearningStrand.findAll({
      where: { classLevelId: classId },
      include: [
        LearningStrand,
        { model: Grade, where: { enrollmentId: enrollmentId } },
        {
          model: Module,
          include: [
            { model: ModuleSubmission, where: { enrollmentId: enrollmentId } },
          ],
        },
        {
          model: Session,
          include: [
            { model: Attendance, where: { enrollmentId: enrollmentId } },
          ],
        },
      ],
    });

    res.status(200).json({
      message: "Fetched student successfully!",
      data: classLearningStrands,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}
