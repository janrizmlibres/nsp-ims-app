import express from "express";
import { body } from "express-validator";

import isAuth from "../middleware/is_auth.js";
import * as profileController from "../controllers/profile.js";

const router = express.Router();

router.get("/students", isAuth, profileController.getStudents);

router.post(
  "/add-student",
  isAuth,
  [
    body("identity").customSanitizer((value) => JSON.parse(value)),
    body("identity.firstName").trim().isAscii(),
    body("identity.middleName")
      .optional({ values: "falsy" })
      .trim()
      .isAlpha("en-US"),
    body("identity.lastName").trim().isAscii(),
    body("identity.suffixName")
      .optional({ values: "null" })
      .trim()
      .matches("^[A-Za-z]+.$"),
    body("identity.lrn").isNumeric({ locale: "en-US" }),
    body("identity.category").exists({ values: "null" }),
  ],
  [
    body("personalInfo").customSanitizer((value) => JSON.parse(value)),
    body("personalInfo.birthday").isISO8601(),
    body("personalInfo.bloodType").exists({ values: "null" }),
    body("personalInfo.birthBarangay").trim().isAscii(),
    body("personalInfo.birthCity").trim().isAscii(),
    body("personalInfo.birthProvince").trim().isAscii(),
    body("personalInfo.religion").trim().isAscii(),
    body("personalInfo.sex").exists({ values: "null" }),
    body("personalInfo.civilStatus").exists({ values: "null" }),
    body("personalInfo.homeBlkLtSt").trim().isAscii(),
    body("personalInfo.homeBarangay").trim().isAscii(),
    body("personalInfo.homeCity").trim().isAscii(),
    body("personalInfo.homeProvince").trim().isAscii(),
  ],
  [
    body("contactInfo").customSanitizer((value) => JSON.parse(value)),
    body("contactInfo.email").trim().isEmail(),
    body("contactInfo.contactNum").trim().isMobilePhone("en-PH"),
    body("contactInfo.facebook").trim().isAscii(),
  ],
  [
    body("emergencyPerson").customSanitizer((value) => JSON.parse(value)),
    body("emergencyPerson.firstName").trim().isAscii(),
    body("emergencyPerson.middleName")
      .optional({ values: "falsy" })
      .trim()
      .isAscii(),
    body("emergencyPerson.lastName").trim().isAscii(),
    body("emergencyPerson.suffixName")
      .optional({ values: "null" })
      .trim()
      .matches("^[A-Za-z]+.$"),
    body("emergencyPerson.contactNum").trim().isMobilePhone("en-PH"),
    body("emergencyPerson.relationship").trim().isAscii(),
  ],
  [
    body("parentalInfo").customSanitizer((value) => JSON.parse(value)),
    body("parentalInfo.lastNameF").trim().isAscii(),
    body("parentalInfo.middleNameF")
      .optional({ values: "falsy" })
      .trim()
      .isAscii(),
    body("parentalInfo.firstNameF").trim().isAscii(),
    body("parentalInfo.suffixNameF")
      .optional({ values: "null" })
      .trim()
      .matches("^[A-Za-z]+.$"),
    body("parentalInfo.occupationF").trim().isAscii(),
    body("parentalInfo.lastNameM").trim().isAscii(),
    body("parentalInfo.middleNameM")
      .optional({ values: "falsy" })
      .trim()
      .isAscii(),
    body("parentalInfo.firstNameM").trim().isAscii(),
    body("parentalInfo.suffixNameM")
      .optional({ values: "null" })
      .trim()
      .matches("^[A-Za-z]+.$"),
    body("parentalInfo.occupationM").trim().isAscii(),
  ],
  [
    body("prevSchool").customSanitizer((value) => JSON.parse(value)),
    body("prevSchool.name").trim().isAscii(),
    body("prevSchool.schoolType").exists({ values: "null" }),
    body("prevSchool.schoolAffiliation").exists({ values: "null" }),
    body("prevSchool.lastSyAttended").exists({ values: "null" }),
    body("prevSchool.highestEducation").exists({ values: "null" }),
    body("prevSchool.gradeStopped").exists({ values: "null" }),
    body("prevSchool.reason").trim().isAscii(),
    body("prevSchool.street").trim().isAscii(),
    body("prevSchool.barangay").trim().isAscii(),
    body("prevSchool.city").trim().isAscii(),
    body("prevSchool.province").trim().isAscii(),
  ],
  profileController.addStudent
);

router.get("/student/:id", isAuth, profileController.getStudent);

export default router;
