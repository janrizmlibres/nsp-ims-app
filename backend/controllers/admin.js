import { validationResult } from "express-validator";
import bcrypt from "bcrypt";

import Staff from "../models/staff/staff.js";
import Permission from "../models/staff/permission.js";
import Audit from "../models/staff/audit.js";

export async function getStaffs(req, res, next) {
  try {
    let { includePerms, includeAudit } = req.query;
    let associations = [];

    if (includePerms) associations.push(Permission);
    if (includeAudit) associations.push(Audit);

    const staffs = await Staff.findAll({
      include: associations,
      where: { accessLevel: [2, 3] },
    });

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

    staff.set(req.body);
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

export async function updatePermissions(req, res, next) {
  try {
    for (const staff of req.body.updatedData) {
      const staffInstance = await Staff.findByPk(staff.id, {
        include: Permission,
      });

      const { id, fullname, ...updatedPerms } = staff;
      await staffInstance.permission.update(updatedPerms);
    }

    res.status(200).json({ message: "Permissions Updated!" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
    return error;
  }
}

export async function updatePassword(req, res, next) {
  try {
    const userId = req.params.userId;
    const staff = await Staff.findByPk(userId);

    if (!staff) {
      const error = Error("Staff not found.");
      error.statusCode = 404;
      throw error;
    }

    const hashedPw = await bcrypt.hash(req.body.newPw, 12);

    if (hashedPw === staff.hashedPw) {
      const error = Error("New password is the same as the old password.");

      // Code for Unprocessable Entity
      // request was well-formed but could not be processed due to semantic errors
      error.statusCode = 422;

      throw error;
    }

    await staff.update({ hashedPw });
    res.status(200).json({ message: "Password updated!" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
    return error;
  }
}

export async function addAudit(req, res, next) {
  try {
    const { userId, description, date } = req.body;
    const staff = await Staff.findByPk(userId);

    if (!staff) {
      const error = new Error("Staff not found.");
      error.statusCode = 404;
      throw error;
    }

    await staff.createAudit({ description, date });
    res.status(200).json({ message: "Audit created." });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
    return error;
  }
}
