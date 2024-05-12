import Student from "../models/student/student.js";
import PersonalInfo from "../models/student/personal_info.js";
import ContactInfo from "../models/student/contact_info.js";
import PreviousSchool from "../models/student/previous_school.js";
import ParentalInfo from "../models/student/parental_info.js";
import EmergencyPerson from "../models/student/emergency_person.js";

export async function getStudents(_req, res, next) {
  try {
    const students = await Student.findAll();

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

// TODO
export async function addStudent(req, res, next) {
  try {
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

export async function getStudent(req, res, next) {
  try {
    const student = Student.findByPk(req.body.id, {
      include: [
        PersonalInfo,
        ContactInfo,
        PreviousSchool,
        ParentalInfo,
        EmergencyPerson,
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
