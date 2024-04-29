import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import prand from "pure-rand";

import Staff from "../models/staff.js";

export async function signup(req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error("Validation failed, entered data is incorrect.");
      error.statusCode = 422;
      throw error;
    }

    const {
      password,
      firstName,
      middleName,
      lastName,
      suffixName,
      position,
      email,
      contactNum,
    } = req.body;

    const seed = Date.now() ^ (Math.random() * 0x100000000);
    const rng = prand.xoroshiro128plus(seed);
    const min = 10000;
    const max = 99999;

    const hashedPw = await bcrypt.hash(password, 12);
    let userId = prand.unsafeUniformIntDistribution(min, max, rng);
    let staff = await Staff.findByPk(userId);

    while (staff !== null) {
      userId = prand.unsafeUniformIntDistribution(min, max, rng);
      staff = await Staff.findByPk(userId);
    }

    const user = await Staff.create({
      id: userId,
      hashed_pw: hashedPw,
      first_name: firstName,
      middle_name: middleName.length == 0 ? null : middleName,
      last_name: lastName,
      suffix_name: suffixName.length == 0 ? null : suffixName,
      position: position.length == 0 ? null : position,
      email: email.length == 0 ? null : email,
      contact_num: contactNum.length == 0 ? null : contactNum,
    });

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
  const { id, password } = req.body;

  try {
    const staff = await Staff.findByPk(id);

    if (!staff) {
      const error = new Error("Authentication failed. User not found.");
      error.statusCode = 401;
      throw error;
    }

    const result = await bcrypt.compare(password, staff.hashed_pw);

    if (!result) {
      const error = new Error("Authentication failed. Wrong password.");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      { username: staff.username, id: staff.id },
      "HEHESECRET", // replace with your secret key
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Authentication successful",
      token: token,
      userId: staff.id,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}
