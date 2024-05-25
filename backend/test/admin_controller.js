import { expect } from "chai";
import * as adminController from "../controllers/admin.js";
import { resetDb } from "./helpers.js";

let res = null;

function expectError(result, message, code) {
  expect(result).to.be.an("error");
  expect(result.message).to.be.equal(message);
  expect(result.statusCode).to.be.equal(code);
}

function expectUserFound(res, message, code, id) {
  expect(res.statusCode).to.be.equal(code);
  expect(res.body.message).to.be.equal(message);
  expect(res.body).to.have.property("user");
  expect(res.body.user.id).to.be.equal(id);
}

describe.skip("Admin Controller (Users)", () => {
  before(async () => await resetDb());
  after(async () => await resetDb());

  beforeEach(() => {
    res = {
      statusCode: null,
      body: null,
      status: function (code) {
        this.statusCode = code;
        return this;
      },
      json: function (data) {
        this.body = data;
      },
    };
  });

  it("should fail to fetch all users when request query does not specify levels to fetch", async () => {
    const req = {
      query: {
        includePerms: false,
        includeAudit: false,
      },
    };

    const result = await adminController.getUsers(req, res, () => {});

    expect(result).to.be.an("error");
    expect(result.statusCode).to.be.equal(500);
  });

  it("should be able to get users from the database except for the admin", async () => {
    const req = {
      query: {
        includePerms: false,
        includeAudit: false,
        levelsToFetch: [2, 3],
      },
    };

    await adminController.getUsers(req, res, () => {});

    expect(res).to.have.property("statusCode", 200);
    expect(res.body).to.have.property(
      "message",
      "Fetched all users successfully."
    );
    expect(res.body).to.have.property("users");
  });

  it("should throw an error if user cannot be found via get request", async () => {
    const req = { params: { userId: 11111 } };

    const result = await adminController.getUser(req, {}, () => {});

    expectError(result, "Could not find user.", 404);
  });

  it("should respond with a user if one is found via get request", async () => {
    const testId = 55166;
    const req = { params: { userId: testId } };

    await adminController.getUser(req, res, () => {});

    expectUserFound(res, "User fetched.", 200, testId);
  });

  it("shoud throw an error if user cannot be found via put request", async () => {
    const req = { params: { userId: 11111 } };

    const result = await adminController.updateUser(req, {}, () => {});

    expectError(result, "Could not find user.", 404);
  });

  it("should successfully save the user model with its new fields given valid data", async () => {
    const test_id = 53697;

    const req = {
      params: { userId: test_id },
      body: {
        firstName: "Husker",
        middleName: null,
        lastName: "Dusk",
        suffixName: null,
        position: "Overlord",
        email: "dusk.husker@test.com",
        contactNum: "09123456789",
      },
    };

    await adminController.updateUser(req, res, () => {});
    expectUserFound(res, "User updated!", 200, test_id);
  });

  it("should fail to update permissions when user is not found.", async () => {
    const req = {
      body: { updatedData: [{ id: 11111, fullname: "I do not exist" }] },
    };

    const result = await adminController.updatePermissions(req, res, () => {});

    expect(result).to.be.an("error");
    expect(result.statusCode).to.be.equal(500);
  });

  it("should successfully update permissions when all users can be found in the database.", async () => {
    const req = {
      body: {
        updatedData: [
          {
            id: 55166,
            fullname: "Xander Rola",
            canMgStuds: false,
            canMgEnrollment: true,
            canMgVolunteer: false,
            canMgClass: true,
            canMgUser: false,
          },
          {
            id: 57381,
            fullname: "Ace Umel",
            canMgStuds: true,
            canMgEnrollment: false,
            canMgVolunteer: true,
            canMgClass: false,
            canMgUser: true,
          },
        ],
      },
    };

    await adminController.updatePermissions(req, res, () => {});

    expect(res.statusCode).to.be.equal(200);
    expect(res.body.message).to.be.equal("Permissions updated.");
  });

  it("should throw an error if user is not found when updating password.", async () => {
    const req = { params: { userId: 11111 } };
    const result = await adminController.updatePassword(req, res, () => {});
    expectError(result, "User not found.", 404);
  });

  it("should throw an error when new password is the same as the old password.", async () => {
    const req = { params: { userId: 53697 }, body: { newPw: "nazpass" } };
    const result = await adminController.updatePassword(req, res, () => {});
    expectError(result, "New password is the same as the old password.", 422);
  });

  it("should successfully update password when user is found and new password does not equal old.", async () => {
    const req = { params: { userId: 53697 }, body: { newPw: "nazpassnew" } };
    await adminController.updatePassword(req, res, () => {});

    expect(res.statusCode).to.be.equal(200);
    expect(res.body.message).to.be.equal("Password updated.");
  });

  it("should throw an error when updating login data if user is not found.", async () => {
    const req = { params: { userId: 12345 }, body: { lastLogin: 12345 } };
    const result = await adminController.updateLastLogin(req, res, () => {});
    expectError(result, "User not found.", 404);
  });

  it("should update last login successfully when user exists and request data is correct.", async () => {
    const req = {
      params: { userId: 91267 },
      body: { lastLogin: new Date() },
    };

    await adminController.updateLastLogin(req, res, () => {});

    expect(res.statusCode).to.be.equal(200);
    expect(res.body.message).to.be.equal("Updated last login data.");
  });

  it("should fail creation of audit trail when user is not found.", async () => {
    const req = { body: { userId: 12345 } };
    const result = await adminController.addAudit(req, res, () => {});
    expectError(result, "User not found.", 404);
  });

  it("should create an audit trail when user is found", async () => {
    const req = {
      body: {
        userId: 91267,
        description: "Testing",
        date: new Date(),
      },
    };

    await adminController.addAudit(req, res, () => {});

    expect(res.statusCode).to.be.equal(200);
    expect(res.body.message).to.be.equal("Audit created.");
  });
});
