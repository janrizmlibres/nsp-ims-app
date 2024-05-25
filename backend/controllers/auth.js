import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prand from "pure-rand";
import { validationResult } from "express-validator";

import User from "../models/user/user.js";
import Permission from "../models/user/permission.js";

// This could be a database or in-memory data structure
// This is a simple in-memory implementation
let invalidatedTokens = [];

export async function signup(req, res, next) {
  try {
    const errors = validationResult(req);
    console.log(errors);

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
    let user = await User.findByPk(userId);

    while (user !== null) {
      userId = prand.unsafeUniformIntDistribution(min, max, rng);
      user = await User.findByPk(userId);
    }

    delete req.body.password;
    const userInstance = await User.create({
      id: userId,
      hashedPw,
      ...req.body,
    });

    if (req.body.accessLevel === 2) {
      await userInstance.createPermission({
        canMgStuds: true,
        canMgEnrollment: true,
        canMgVolunteer: true,
        canMgClass: true,
        canMgTerm: true,
        canMgLs: true,
        canMgStudReq: true,
        canMgStudCat: true,
        canMgUser: true,
      });
    } else {
      await userInstance.createPermission();
    }

    res.status(201).json({ message: "User created!", user: userInstance });
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
    const user = await User.findByPk(userId, { include: Permission });

    if (!user) {
      const error = new Error("Authentication failed. User not found.");
      error.statusCode = 401;
      throw error;
    }

    const result = await bcrypt.compare(password, user.hashedPw);

    if (!result) {
      const error = new Error("Authentication failed. Wrong password.");
      error.statusCode = 401;
      throw error;
    }

    const authToken = jwt.sign({ userId: user.id }, "HEHESECRET", {
      expiresIn: "1h",
    });

    const refreshToken = jwt.sign({ userId: user.id }, "HEHESECRET", {
      expiresIn: "10h", // Refresh token valid for 7 days
    });

    return res.status(200).json({
      message: "Authentication successful",
      token: authToken,
      refreshToken: refreshToken,
      user: {
        id: user.id,
        accessLevel: user.accessLevel,
        permissions: user.permission,
        userName: user.fullname,
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

/**
 * The refreshToken function is used to refresh the authentication token.
 * It takes the refresh token from the request body.
 * It then verifies the refresh token.
 * If the refresh token is invalid, it returns an error message.
 * If the refresh token is valid, it generates a new authentication token and a new refresh token.
 * It then invalidates the old refresh token.
 * It sends the new authentication token and the new refresh token back to the client.
 * @param req - The request object. It should contain the refresh token.
 * @param res - The response object. It should contain the new authentication token and the new refresh token.
 * @param next - The next middleware function.
 */
export async function refreshToken(req, res, next) {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    const error = new Error("No refresh token provided.");
    error.statusCode = 401;
    throw error;
  }

  if (invalidatedTokens.includes(refreshToken)) {
    const error = new Error("Invalid refresh token.");
    error.statusCode = 403;
    throw error;
  }

  let userId;
  try {
    const decoded = jwt.verify(refreshToken, "HEHESECRET");
    userId = decoded.userId;
  } catch (err) {
    const error = new Error("Invalid refresh token.");
    error.statusCode = 403;
    throw error;
  }

  const newAuthToken = jwt.sign({ userId: userId }, "HEHESECRET", {
    expiresIn: "1h",
  });

  const newRefreshToken = jwt.sign({ userId: userId }, "HEHESECRET", {
    expiresIn: "10h",
  });

  // Invalidate the old refresh token
  invalidatedTokens.push(refreshToken);

  return res.status(200).json({
    message: "Refresh successful",
    token: newAuthToken,
    refreshToken: newRefreshToken,
  });
}

export async function logout(req, res, next) {
  const token = req.body.token;
  const refreshToken = req.body.refreshToken;

  try {
    jwt.verify(token, "HEHESECRET");
  } catch (error) {
    if (token) {
      invalidatedTokens.push(token);
    }
  }
  
  if (refreshToken) {
    invalidatedTokens.push(refreshToken);
  }

  return res.status(200).json({ message: "Logout successful" });
}
