import { expect } from "chai";
import * as adminController from "../controllers/admin.js";
import { resetDb, resCopy } from "./helpers.js";

let res = { ...resCopy };

function expectError(result, message, code) {
  expect(result).to.be.an("error");
  expect(result.message).to.be.equal(message);
  expect(result.statusCode).to.be.equal(code);
}

function expectStaffFound(res, message, code, id) {
  expect(res.statusCode).to.be.equal(code);
  expect(res.body.message).to.be.equal(message);
  expect(res.body).to.have.property("staff");
  expect(res.body.staff.id).to.be.equal(id);
}

describe("Admin Controller (Staffs)", () => {
  before(async () => await resetDb());
  after(async () => await resetDb());

  beforeEach(() => (res = { ...resCopy }));

  it("should be able to get staffs from the database", async () => {
    const req = { query: { includePerms: false, includeAudit: false } };
    await adminController.getStaffs(req, res, () => {});

    expect(res).to.have.property("statusCode", 200);
    expect(res.body).to.have.property(
      "message",
      "Fetched all staff successfully."
    );
    expect(res.body).to.have.property("staffs");
  });

  it("should throw an error if staff cannot be found via get request", async () => {
    const req = { params: { userId: 11111 } };

    const result = await adminController.getStaff(req, {}, () => {});

    expectError(result, "Could not find staff.", 404);
  });

  it("should respond with a staff if one is found via get request", async () => {
    const test_id = 53697;
    const req = { params: { userId: test_id } };

    await adminController.getStaff(req, res, () => {});

    expectStaffFound(res, "Staff fetched.", 200, test_id);
  });

  it("shoud throw an error if staff cannot be found via put request", async () => {
    const req = { params: { userId: 11111 } };

    const result = await adminController.updateStaff(req, {}, () => {});

    expectError(result, "Could not find staff.", 404);
  });

  it("should successfully save the staff model with its new fields given valid data", async () => {
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

    await adminController.updateStaff(req, res, () => {});
    expectStaffFound(res, "Staff updated!", 200, test_id);
  });

  it("should create an audit trail when staff is found", async () => {
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
