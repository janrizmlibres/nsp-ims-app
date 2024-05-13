import Volunteer from "../models/volunteer.js"
import VolunteerPersonalInformation from "../models/volunteer_personal_information.js";

export async function getAllVolunteers(req, res, next) {
  try {
    const volunteers = await Volunteer.findAll({
      include: [VolunteerPersonalInformation]
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