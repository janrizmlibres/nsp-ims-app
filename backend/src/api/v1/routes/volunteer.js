import { body } from "express-validator";

import express from "express";
import * as volunteerController from "../controllers/volunteer.js";
import isAuth from "../middleware/is_auth.js";

const router = express.Router();

const volunteerHeaderValidator = [
    body("volunteerHeader").customSanitizer((value) => JSON.parse(JSON.stringify(value))),
    body("volunteerHeader.firstName")
        .trim()
        .isAscii(),
    body("volunteerHeader.middleName")
      .optional({ values: "falsy" })
      .trim()
      .isAlpha("en-US"),
    body("volunteerHeader.lastName")
        .trim()
        .isAscii(),
    body("volunteerHeader.suffix")
      .optional({ values: "null" })
      .trim()
      .matches("^[A-Za-z]+.?$"),
    body("volunteerHeader.affiliation")
        .exists({ checkNull: true })
];
  
const personalInformationValidator = [
    body("personalInformation").customSanitizer((value) => JSON.parse(JSON.stringify(value))),
    body("personalInformation.birthday")
        .isISO8601(),
    body("personalInformation.nickname")
        .trim()
        .isAlpha("en-US"),
    body("personalInformation.sex")
        .exists({ checkNull: true }),
    body("personalInformation.housing")
        .trim()
        .isAscii(),
    body("personalInformation.barangay")
        .trim()
        .isAscii(),
    body("personalInformation.city")
        .trim()
        .isAscii(),
    body("personalInformation.province")
        .trim()
        .isAscii(),
];

const contactInformationValidator = [
    body("contactInformation").customSanitizer((value) => JSON.parse(JSON.stringify(value))),
    body("contactInformation.email")
        .optional({ values: "falsy" })
        .trim()
        .isEmail(),
    body("contactInformation.contactNumber")
        .trim()
        .isMobilePhone("en-PH"),
    body("contactInformation.facebook")
        .optional({ values: "falsy" })
        .trim().isAscii(),
];

const emergencyValidator = [
    body("emergency").customSanitizer((value) => JSON.parse(JSON.stringify(value))),
    body("emergency.firstName")
        .trim()
        .isAscii(),
    body("emergency.middleName")
        .optional({ values: "falsy" })
        .trim()
        .isAscii(),
    body("emergency.lastName")
        .trim()
        .isAscii(),
    body("emergency.suffix")
        .optional({ values: "null" })
        .trim()
        .matches("^[A-Za-z]+.?$"),
    body("emergency.contactNumber")
        .trim()
        .isMobilePhone("en-PH"),
    body("emergency.relationship")
        .trim()
        .isAscii(),
];

const availabilityValidator = [
    body("availability").customSanitizer((value) => JSON.parse(JSON.stringify(value))),
    body("availability.day")
        .notEmpty().withMessage('Day cannot be empty')
];

const specializationValidator = [
    body("specialization").customSanitizer((value) => JSON.parse(JSON.stringify(value))),
    body("specialization.area")
        .notEmpty().withMessage('Day cannot be empty')
];

const studentValidator = [
    body("student").customSanitizer((value) => JSON.parse(JSON.stringify(value))),
    body("student.program")
        .optional({ values: "falsy" })
        .trim()
        .isAscii(),
    body("student.year")
        .optional({ values: "falsy" })
        .trim()
        .isAscii(),
];

const professionalValidator = [
    body("professional").customSanitizer((value) => JSON.parse(JSON.stringify(value))),
    body("professional.work")
        .optional({ values: "falsy" })
        .trim()
        .isAscii(),
];

router.get("/volunteers", isAuth, volunteerController.getAllVolunteers);

router.post("/add-volunteer", 
    isAuth, 
    volunteerHeaderValidator,
    personalInformationValidator,
    contactInformationValidator,
    emergencyValidator,
    availabilityValidator,
    specializationValidator,
    studentValidator,
    professionalValidator,
    volunteerController.addVolunteer);

router.get("/:id", isAuth, volunteerController.getVolunteer);

router.put("/update-volunteer/:id", 
    isAuth, 
    volunteerHeaderValidator,
    personalInformationValidator,
    contactInformationValidator,
    emergencyValidator,
    availabilityValidator,
    specializationValidator,
    studentValidator,
    professionalValidator,
    volunteerController.updateVolunteer);

router.delete("/delete-volunteer/:id", isAuth, volunteerController.deleteVolunteer);

export default router;