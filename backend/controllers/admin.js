import { validationResult } from "express-validator";
import Staff from "../models/staff.js";
import Permission from "../models/permission.js";

export async function getStaffs(req, res, next) {
  const { includePerms } = req.params;

  try {
    const staffs = await Staff.findAll(
      includePerms ? { include: Permission } : {}
    );
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

export async function getStaff(req, res, next) {
  const userId = req.params.userId;

  try {
    const staff = await Staff.findByPk(userId);

    if (!staff) {
      const error = new Error("Could not find staff.");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ message: "Staff fetched.", staff: staff });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
    return error;
  }
}

export async function updateStaff(req, res, next) {
  const userId = req.params.userId;

  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error("Validation failed, entered data is incorrect.");
      error.statusCode = 422;
      throw error;
    }

    const staff = await Staff.findByPk(userId);

    if (!staff) {
      const error = new Error("Could not find staff.");
      error.statusCode = 404;
      throw error;
    }

    staff.set({
      first_name: req.body.firstName,
      middle_name: req.body.middleName,
      last_name: req.body.lastName,
      suffix_name: req.body.suffixName,
      position: req.body.position,
      email: req.body.email,
      contact_num: req.body.contact_num,
    });

    const result = await staff.save();

    res.status(200).json({
      message: "Staff updated!",
      staff: result,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
    return error;
  }
}
