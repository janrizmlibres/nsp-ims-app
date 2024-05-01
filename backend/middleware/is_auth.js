import jwt from "jsonwebtoken";

export default function (req, res, next) {
  try {
    const authHeader = req.get("Authorization");

    if (!authHeader) {
      const error = new Error("Not authenticated.");
      error.statusCode = 401;
      throw error;
    }

    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, "HEHESECRET");

    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
    return error;
  }
}
