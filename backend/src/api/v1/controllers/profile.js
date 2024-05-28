import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { validationResult } from "express-validator";

import Student from "../models/student/student.js";
import PersonalInfo from "../models/student/personal_info.js";
import ContactInfo from "../models/student/contact_info.js";
import EmergencyPerson from "../models/student/emergency_person.js";
import ParentalInfo from "../models/student/parental_info.js";
import PreviousSchool from "../models/student/previous_school.js";
import RequirementInfo from "../models/student/requirement_info.js";
import StudentRequirement from "../models/student_requirement.js";

import ClassLevel from "../models/class/class_level.js";

export async function getStudents(_req, res, next) {
  try {
    const students = await Student.findAll({
      include: [PersonalInfo, ContactInfo, RequirementInfo],
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
        RequirementInfo
      ],
    });

    if (!student) {
      const error = Error("Student not found.");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ message: "Student fetched.", student: student });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
    return error;
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

    const student = await Student.create({
      ...req.body.identity,
      photoUrl: req.file && req.file.path.replace("\\", "/"),
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

    try {
      const requirements = await StudentRequirement.findAll();
      console.log(requirements);
      console.log("im making requirements!");

      await Promise.all(requirements.map(requirement => 
        RequirementInfo.create({ 
          studentId: student.id,
          studentRequirementId: requirement.id,
          met: false
        })
      ))
      
      console.log(await RequirementInfo.findAll());
      ;
    } catch (error) {
      console.error('An error occurred:', error);
    }

    res.status(200).json({
      message: "Student record created.",
      student: student,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
    return error;
  }
}

export async function updateStudent(req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error("Validation failed, entered data is incorrect.");
      error.statusCode = 422;
      throw error;
    }

    const studentId = req.params.studentId;
    const student = await Student.findByPk(studentId);

    if (!student) {
      const error = Error("Student not found.");
      error.statusCode = 404;
      throw error;
    }

    const {
      identity,
      personalInfo,
      contactInfo,
      emergencyPerson,
      parentalInfo,
      prevSchool,
    } = req.body;

    const imageUrl = req.file
      ? req.file.path.replace("\\", "/")
      : identity.photoUrl;

    if (imageUrl !== student.photoUrl) {
      clearImage(student.photoUrl);
      identity.photoUrl = imageUrl;
    }

    const personalInfoInstance = await PersonalInfo.findOne({
      where: { studentId: student.id },
    });

    const contactInfoInstance = await ContactInfo.findOne({
      where: { studentId: student.id },
    });

    const emergencyPersonInstance = await EmergencyPerson.findOne({
      where: { studentId: student.id },
    });

    const parentalInfoInstance = await ParentalInfo.findOne({
      where: { studentId: student.id },
    });

    const prevSchoolInstance = await PreviousSchool.findOne({
      where: { studentId: student.id },
    });

    await student.update(identity);
    await personalInfoInstance.update(personalInfo);
    await contactInfoInstance.update(contactInfo);
    await emergencyPersonInstance.update(emergencyPerson);
    await prevSchoolInstance.update(prevSchool);

    if (!parentalInfoInstance) {
      await ParentalInfo.create({ ...parentalInfo, studentId: student.id });
    } else {
      await parentalInfoInstance.update(parentalInfo);
    }

    res.status(200).json({ message: "Student information updated." });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
    return error;
  }
}

export async function updateStudentRequirements(req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error("Validation failed, entered data is incorrect.");
      error.statusCode = 422;
      throw error;
    }

    const studentId = req.params.studentId;
    const requirementInfos = req.body.requirement_infos.requirement_infos;
    console.log(requirementInfos)

    const student = await Student.findByPk(studentId);

    if (!student) {
      const error = new Error("Student not found.");
      error.statusCode = 404;
      throw error;
    }

    const existingRequirements = await RequirementInfo.findAll({
      where: { studentId: student.id },
    });

    for (const requirementInfo of requirementInfos) {
      const existingRequirement = existingRequirements.find(
        (req) => req.id === requirementInfo.id
      );

      if (existingRequirement) {
        await existingRequirement.update(requirementInfo);
      } else {
        const error = new Error("Requirement not found.");
        error.statusCode = 404;
        throw error;
      }
    }

    res.status(200).json({ message: "Student requirements updated." });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
    return error;
  }
}

const clearImage = (filePath) => {
  if (!filePath) return;

  const __dirname = dirname(fileURLToPath(import.meta.url));
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};

export async function getAllStudentsWithClassLevel(req, res, next) {
  try {
    const students = await Student.findAll({
      include: [ClassLevel]
    });

    if (!students) {
      const error = new Error("No students found.");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ message: "Students fetched.", students: students });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}