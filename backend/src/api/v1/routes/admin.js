import express from "express";
import { body } from "express-validator";

import * as adminController from "../controllers/admin.js";
import isAuth from "../middlewares/is_auth.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Books:
 *      type: object
 *      required:
 *        - title
 *        - description
 *        - finished
 *      properties:
 *        id:
 *          type: string
 *          description: The auto-generated id of the book
 *        title:
 *          type: string
 *          description: The title of the book
 *        description:
 *          type: string
 *          description: The book explanation
 */

/**
 * @swagger
 * /v1/employee/{id}:
 *   get:
 *     summary: Get employee by ID (SAMPLE ONLY).
 *     description: Get employee by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Employee ID
 *     responses:
 *       '200':
 *         description: A successful response
 *       '404':
 *         description: Employee not found
 *       '500':
 *         description: Internal server error
 */
router.get("/users", isAuth, adminController.getUsers);

router.get("/user/:userId", isAuth, adminController.getUser);

router.put(
  "/user/:userId",
  isAuth,
  [
    body("firstName").trim().isAlpha("en-US"),
    body("middleName").optional({ values: "falsy" }).trim().isAlpha("en-US"),
    body("lastName").trim().isAlpha("en-US"),
    body("suffixName")
      .optional({ values: "falsy" })
      .trim()
      .matches("^[A-Za-z]+.$"),
    body("email").optional({ values: "falsy" }).trim().isEmail(),
    body("contactNum")
      .optional({ values: "falsy" })
      .trim()
      .isMobilePhone("en-PH"),
  ],
  adminController.updateUser
);

router.put(
  "/users/update-permissions",
  isAuth,
  adminController.updatePermissions
);

router.patch(
  "/user/password/:userId",
  isAuth,
  [body("newPw").isStrongPassword({ minLength: 8 })],
  adminController.updatePassword
);

router.patch(
  "/user/last-login/:userId",
  isAuth,
  adminController.updateLastLogin
);

router.post("/user/add-audit", isAuth, adminController.addAudit);

export default router;
