import { body } from 'express-validator';

import express from "express";
import * as volunteerController from "../controllers/volunteer.js";
import isAuth from "../middleware/is_auth.js";

const router = express.Router();

router.get("/volunteers", isAuth, volunteerController.getAllVolunteers);

router.post(
  "/add-volunteer",
  isAuth,
  [
    body("Volunteer.volunteerId").isInt(),
    body("Volunteer.affiliation").trim().isAscii(),
    body("Volunteer.lastName").trim().isAscii(),
    body("Volunteer.firstName").trim().isAscii(),
    body("Volunteer.middleName").optional({ checkFalsy: true }).trim().isAscii(),
    body("Volunteer.suffix").optional({ checkFalsy: true }).trim().isAscii(),
  ],
  [
    body("VolunteerPersonalInformation.nickname").trim().isAscii(),
    body("VolunteerPersonalInformation.sex").trim().isAscii(),
    body("VolunteerPersonalInformation.birthday").isDate(),
    body("VolunteerPersonalInformation.housing").trim().isAscii(),
    body("VolunteerPersonalInformation.barangay").trim().isAscii(),
    body("VolunteerPersonalInformation.city").trim().isAscii(),
    body("VolunteerPersonalInformation.province").trim().isAscii(),
  ],
  [
    body("VolunteerContactInformation.contactNumber").trim().isMobilePhone("en-PH"),
    body("VolunteerContactInformation.email").trim().isEmail(),
    body("VolunteerContactInformation.facebook").trim().isAscii(),
  ],
  [
    body("VolunteerEmergency.lastName").trim().isAscii(),
    body("VolunteerEmergency.firstName").trim().isAscii(),
    body("VolunteerEmergency.middleName").optional({ checkFalsy: true }).trim().isAscii(),
    body("VolunteerEmergency.suffix").optional({ checkFalsy: true }).trim().isAscii(),
    body("VolunteerEmergency.contactNumber").trim().isMobilePhone("en-PH"),
    body("VolunteerEmergency.relationship").trim().isAscii(),
  ],
  [
    body("StudentVolunteer.program").trim().isAscii(),
    body("StudentVolunteer.year").trim().isAscii(),
  ],
  [
    body("VolunteerAvailability.day").trim().isAscii(),
  ],
  [
    body("VolunteerSpecialization.area").trim().isAscii(),
  ],
  volunteerController.addVolunteer
);

export default router;