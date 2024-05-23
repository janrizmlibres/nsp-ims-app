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
      volunteers: volunteers
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

    const volunteer = await Volunteer.create(req.body.volunteerHeader);

    await VolunteerPersonalInformation.create({
      ...req.body.personalInformation,
      volunteerId: volunteer.id,
    });

    await VolunteerContactInformation.create({
      ...req.body.contactInformation,
      volunteerId: volunteer.id,
    });

    await VolunteerEmergency.create({
      ...req.body.emergency,
      volunteerId: volunteer.id,
    });

    await VolunteerSpecialization.create({
      ...req.body.specialization,
      volunteerId: volunteer.id,
    });

    await VolunteerAvailability.create({
      ...req.body.availability,
      volunteerId: volunteer.id,
    });

    //only creates an instance of student volunteer if program and year has an entry
    if (req.body.student.program && req.body.student.year) {
      await StudentVolunteer.create({
      ...req.body.student,
      volunteerId: volunteer.id,
      });
    }

    //only creates an instance of professional volunteer if work has an entry
    if (req.body.professional.work) {
      await ProfessionalVolunteer.create({
      ...req.body.professional,
      volunteerId: volunteer.id,
      });
    }

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

export async function getVolunteer(req, res, next) {
  const id = req.params.id;
  try {
    const volunteer = await Volunteer.findByPk(id, {
      include: [VolunteerPersonalInformation, 
                VolunteerContactInformation, 
                VolunteerSpecialization,
                VolunteerAvailability,
                VolunteerEmergency,
                StudentVolunteer,
                ProfessionalVolunteer]
    });

    if (!volunteer) {
      const error = Error("Volunteer not found.");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ message: "Volunteer fetched.", volunteer: volunteer });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

export async function updateVolunteer(req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error("Validation failed, entered data is incorrect.");
      error.statusCode = 422;
      throw error;
    }

    const id = req.params.id;
    const volunteer = await Volunteer.findByPk(id);

    if (!volunteer) {
      const error = new Error("Could not find volunteer.");
      error.statusCode = 404;
      throw error;
    }

    const {
      volunteerHeader,
      personalInformation,
      contactInformation,
      emergency,
      availability,
      specialization,
      student,
      professional
    } = req.body;

    const personalInformationInstance = await VolunteerPersonalInformation.findOne({
      where: { id: volunteer.id },
    });

    const contactInformationInstance = await VolunteerContactInformation.findOne({
      where: { id: volunteer.id },
    });

    const emergencyInstance = await VolunteerEmergency.findOne({
      where: { id: volunteer.id },
    });

    const specializationInstance = await VolunteerSpecialization.findOne({
      where: { id: volunteer.id },
    });

    const availabilityInstance = await VolunteerAvailability.findOne({
      where: { id: volunteer.id },
    });

    const studentInstance = await StudentVolunteer.findOne({
      where: { id: volunteer.id },
    });

    const professionalInstance = await ProfessionalVolunteer.findOne({
      where: { id: volunteer.id },
    });
    
    
    delete volunteerHeader.fullname; // This line will remove fullName from the update
    await volunteer.update(volunteerHeader);
    delete personalInformation.address;
    await personalInformationInstance.update(personalInformation);
    await contactInformationInstance.update(contactInformation);
    delete emergency.fullname;
    await emergencyInstance.update(emergency);
    await specializationInstance.update(specialization);
    await availabilityInstance.update(availability);
    if (studentInstance) {
      await studentInstance.update(student);
    } else if (Object.keys(student).length > 0) {
      // Create a new StudentVolunteer entry only if student is not empty
      student.id = volunteer.id; // Assuming the volunteer id should be used as the id for the new entry
      await StudentVolunteer.create(student);
    }
    if (professionalInstance) {
      await professionalInstance.update(professional);
    } else if (Object.keys(professional).length > 0) {
      // Create a new ProfessionalVolunteer entry only if professional is not empty
      professional.id = volunteer.id; // Assuming the volunteer.id should be used as the id for the new entry
      await ProfessionalVolunteer.create(professional);
    }

    res.status(200).json({ message: "Volunteer information updated!" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}
