import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import Staff from "../models/staff.js";

export async function signup(req, res, next) {
  const { last_name, first_name, username, password } = req.body;

  try {
    const hashedPw = await bcrypt.hash(password, 12);
    const user = await Staff.create({
      last_name: last_name,
      first_name: first_name,
      username: username,
      hashed_pw: hashedPw,
    });

    res.status(201).json({ message: "User created!", userId: user.id });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

export async function login(req, res, next) {
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
   * @param {Object} next - The next delegator object
   * @returns {Object} - The response object
   */
  const { username, password } = req.body;

  try {
    const user = await Staff.findOne({ where: { username: username } });

    if (!user) {
      const error = new Error("Authentication failed. User not found.");
      error.statusCode = 401; // Code for not authenticated
      throw error;
    }

    const isEqual = bcrypt.compare(password, user.hashed_pw);

    if (!isEqual) {
      const error = new Error("Authentication failed. Wrong password.");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        username: user.username,
        userId: user.id.toString(),
      },
      "HEHESECRET",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Authentication successful",
      token: token,
      userId: user.id.toString(),
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}
