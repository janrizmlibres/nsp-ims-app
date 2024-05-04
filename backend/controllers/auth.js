import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import prand from "pure-rand";

import Staff from "../models/staff.js";
import Permission from "../models/permission.js";

export async function signup(req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error("Validation failed, entered data is incorrect.");
      error.statusCode = 422;
      throw error;
    }

    const seed = Date.now() ^ (Math.random() * 0x100000000);
    const rng = prand.xoroshiro128plus(seed);
    const min = 10000;
    const max = 99999;

    const hashedPw = await bcrypt.hash(req.body.password, 12);
    let userId = prand.unsafeUniformIntDistribution(min, max, rng);
    let staff = await Staff.findByPk(userId);

    while (staff !== null) {
      userId = prand.unsafeUniformIntDistribution(min, max, rng);
      staff = await Staff.findByPk(userId);
    }

    delete req.body.password;
    const user = await Staff.create({ id: userId, hashedPw, ...req.body });
    await user.createPermission();

    res.status(201).json({ message: "User created!", user });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

/**
 * The login function is used to authenticate a user.
 * It takes the username and password from the request body.
 * It then searches for the user in the database.
 * If the user is found, it compares the password with the hashed password in the database.
 * If the password matches, it generates a token using the user's username and id.
 * The token is then sent back to the client.
 * If the password does not match, it returns an error message.
 * If the user is not found, it returns an error message.
 * If there is an error while searching for the user, it returns an error message.
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param next - The next middleware function
 * @returns {Object} - The response object
 */
export async function login(req, res, next) {
  const { userId, password } = req.body;

  try {
    const staff = await Staff.findByPk(userId, { include: Permission });

    if (!staff) {
      const error = new Error("Authentication failed. User not found.");
      error.statusCode = 401;
      throw error;
    }

    const result = await bcrypt.compare(password, staff.hashedPw);

    if (!result) {
      const error = new Error("Authentication failed. Wrong password.");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ userId: staff.id }, "HEHESECRET", {
      expiresIn: "1h",
    });

    return res.status(200).json({
      message: "Authentication successful",
      token: token,
      staff: {
        id: staff.id,
        accessLevel: staff.accessLevel,
        permissions: staff.permission,
        userName: staff.fullname
      },
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
    return error;
  }
}
