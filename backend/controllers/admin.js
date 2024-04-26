import Staff from "../models/staff.js";

export async function getStaffs(req, res, next) {
  try {
    const staffs = await Staff.findAll();
    res.status(200).json({
      message: "Fetched all staff successfully.",
      staffs: staffs,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}
