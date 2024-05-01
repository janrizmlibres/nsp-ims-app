import Student from "../models/student";

export async function getStudents(req, res, next) {
  try {
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}
