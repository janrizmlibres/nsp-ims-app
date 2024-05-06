import Volunteer from "../models/volunteer.js"

export async function getAllVolunteers(req, res, next) {
  try {
      const volunteers = await Volunteer.findAll()

      res.status(201).json({ 
        message: "Fetched Volunteers Sucessfully!", 
        data: volunteers
      });
  } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
  }
}
