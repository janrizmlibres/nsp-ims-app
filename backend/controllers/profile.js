import Student from "../models/student";

export async function getStudents(_req, res, next) {
  try {
    const students = Student.findAll();

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
