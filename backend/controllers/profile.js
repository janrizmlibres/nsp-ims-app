import { validationResult } from "express-validator";

import Student from "../models/student/student.js";
import PersonalInfo from "../models/student/personal_info.js";
import ContactInfo from "../models/student/contact_info.js";
import EmergencyPerson from "../models/student/emergency_person.js";
import ParentalInfo from "../models/student/parental_info.js";
import PreviousSchool from "../models/student/previous_school.js";

export async function getStudents(_req, res, next) {
  try {
    const students = await Student.findAll({
      include: [PersonalInfo, ContactInfo],
    });

    res.status(200).json({
      message: "Fetched all students successfully.",
      students: students,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

export async function getStudent(req, res, next) {
  const studentId = req.params.studentId;

  try {
    const student = await Student.findByPk(studentId, {
      include: [
        PersonalInfo,
        ContactInfo,
        EmergencyPerson,
        ParentalInfo,
        PreviousSchool,
      ],
    });

    if (!student) {
      const error = Error("Student cannot be found.");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ message: "Student fetched.", student: student });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

export async function addStudent(req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error("Validation failed, entered data is incorrect.");
      error.statusCode = 422;
      throw error;
    }

    if (!req.file) {
      const error = new Error("No profile photo provided.");
      error.statusCode = 422;
      throw error;
    }

    const student = await Student.create({
      ...req.body.identity,
      photoUrl: req.file.path.replace("\\", "/"),
    });

    await PersonalInfo.create({
      ...req.body.personalInfo,
      studentId: student.id,
    });

    await ContactInfo.create({
      ...req.body.contactInfo,
      studentId: student.id,
    });

    await EmergencyPerson.create({
      ...req.body.emergencyPerson,
      studentId: student.id,
    });

    await ParentalInfo.create({
      ...req.body.parentalInfo,
      studentId: student.id,
    });

    await PreviousSchool.create({
      ...req.body.prevSchool,
      studentId: student.id,
    });

    res.status(200).json({
      message: "Student record created.",
      student: student,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}
