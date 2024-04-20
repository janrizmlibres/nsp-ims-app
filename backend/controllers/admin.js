import Staff from "../models/staff.js";

export async function getAllStaff(req, res, next) {
  try {
    const allStaff = await Staff.findAll();
    res.status(200).json({
      message: "Fetched all staff successfully.",
      staffs: allStaff,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}
