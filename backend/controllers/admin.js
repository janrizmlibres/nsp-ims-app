import { validationResult } from "express-validator";
import bcrypt from "bcrypt";

import User from "../models/user/user.js";
import Permission from "../models/user/permission.js";
import Audit from "../models/user/audit.js";

export async function getUsers(req, res, next) {
  try {
    let { includePerms, includeAudit, levelsToFetch } = req.query;
    let associations = [];

    if (includePerms) associations.push(Permission);
    if (includeAudit) associations.push(Audit);

    const users = await User.findAll({
      include: associations,
      where: { accessLevel: levelsToFetch },
    });

    res.status(200).json({
      message: "Fetched all user successfully.",
      users: users,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

export async function getUser(req, res, next) {
  const userId = req.params.userId;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      const error = new Error("Could not find user.");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ message: "user fetched.", user: user });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
    return error;
  }
}

export async function updateUser(req, res, next) {
  const userId = req.params.userId;

  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error("Validation failed, entered data is incorrect.");
      error.statusCode = 422;
      throw error;
    }

    const user = await User.findByPk(userId);

    if (!user) {
      const error = new Error("Could not find user.");
      error.statusCode = 404;
      throw error;
    }

    const permissionSet = await user.getPermission();
    const accessLevel = req.body.accessLevel;

    if (accessLevel !== user.accessLevel && accessLevel === 2) {
      await permissionSet.update({
        canMgStuds: true,
        canMgEnrollment: true,
        canMgVolunteer: true,
        canMgClass: true,
        canMgUser: true,
      });
    }

    const userResult = await user.update(req.body);

    res.status(200).json({
      message: "User updated!",
      user: userResult,
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
    for (const user of req.body.updatedData) {
      const userInstance = await User.findByPk(user.id, {
        include: Permission,
      });

      const { id, fullname, ...updatedPerms } = user;
      await userInstance.permission.update(updatedPerms);
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
    const user = await User.findByPk(userId);

    if (!user) {
      const error = Error("User not found.");
      error.statusCode = 404;
      throw error;
    }

    const hashedPw = await bcrypt.hash(req.body.newPw, 12);

    if (hashedPw === user.hashedPw) {
      const error = Error("New password is the same as the old password.");

      // Code for Unprocessable Entity
      // request was well-formed but could not be processed due to semantic errors
      error.statusCode = 422;

      throw error;
    }

    await user.update({ hashedPw });
    res.status(200).json({ message: "Password updated!" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
    return error;
  }
}

export async function updateLastLogin(req, res, next) {
  try {
    const user = await User.findByPk(req.params.userId);

    if (!user) {
      const error = Error("User not found.");
      error.statusCode = 404;
      throw error;
    }

    const lastLogin = req.body.lastLogin;
    await user.update({ lastLogin });

    res.status(200).json({ message: "Updated last login data." });
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
    const user = await User.findByPk(userId);

    if (!user) {
      const error = new Error("User not found.");
      error.statusCode = 404;
      throw error;
    }

    await user.createAudit({ description, date });
    res.status(200).json({ message: "Audit created." });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
    return error;
  }
}
