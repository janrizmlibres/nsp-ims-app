import { validationResult } from 'express-validator';

import Volunteer from "../models/volunteer/volunteer.js"
import VolunteerPersonalInformation from "../models/volunteer/volunteer_personal_information.js";
import VolunteerContactInformation from "../models/volunteer/volunteer_contact_information.js";
import VolunteerSpecialization from "../models/volunteer/volunteer_specialization.js";
import VolunteerAvailability from "../models/volunteer/volunteer_availability.js";
import VolunteerEmergency from "../models/volunteer/volunteer_emergency_contact.js";
import StudentVolunteer from "../models/volunteer/student_volunteer.js";
import ProfessionalVolunteer from "../models/volunteer/professional_volunteer.js";

export async function getAllVolunteers(req, res, next) {
  try {
    const volunteers = await Volunteer.findAll({
      include: [VolunteerPersonalInformation, 
                VolunteerContactInformation, 
                VolunteerSpecialization,
                VolunteerAvailability,
                VolunteerEmergency,
                StudentVolunteer,
                ProfessionalVolunteer]
    });

    res.status(201).json({ 
      message: "Fetched Volunteers Successfully!", 
      data: volunteers
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

export async function addVolunteer(req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error("Validation failed, entered data is incorrect.");
      error.statusCode = 422;
      throw error;
    }

    const volunteer = await Volunteer.create(req.body.Volunteer);

    await VolunteerPersonalInformation.create({
      ...req.body.VolunteerPersonalInformation,
      volunteerId: volunteer.id,
    });

    await VolunteerContactInformation.create({
      ...req.body.VolunteerContactInformation,
      volunteerId: volunteer.id,
    });

    await VolunteerEmergency.create({
      ...req.body.VolunteerEmergency,
      volunteerId: volunteer.id,
    });

    await VolunteerSpecialization.create({
      ...req.body.VolunteerSpecialization,
      volunteerId: volunteer.id,
    });

    await VolunteerAvailability.create({
      ...req.body.VolunteerAvailability,
      volunteerId: volunteer.id,
    });

    await StudentVolunteer.create({
      ...req.body.StudentVolunteer,
      volunteerId: volunteer.id,
    });

    await ProfessionalVolunteer.create({
      ...req.body.ProfessionalVolunteer,
      volunteerId: volunteer.id,
    });

    res.status(200).json({
      message: "Volunteer record created.",
      volunteer: volunteer,
    });
  } catch (error) {
    console.error('Error details:', error);
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}