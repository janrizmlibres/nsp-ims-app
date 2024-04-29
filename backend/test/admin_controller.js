import { expect } from "chai";
import sinon from "sinon";

import * as adminController from "../controllers/admin.js";
import Staff from "../models/staff.js";

describe("Admin Controller (Staffs)", () => {
  beforeEach(() => {
    sinon.stub(Staff, "findAll");
    sinon.stub(Staff, "findByPk");
  });

  afterEach(() => {
    Staff.findAll.restore();
    Staff.findByPk.restore();
  });

  it("should be able to get a total of 2 staffs from the database", async () => {
    Staff.findAll.returns([{ id: 11111 }, { id: 22222 }, { id: 33333 }]);
    await adminController.getStaffs({}, res, () => {});

    expect(res).to.have.property("statusCode", 200);
    expect(res.body).to.have.property(
      "message",
      "Fetched all staff successfully."
    );
    expect(res.body).to.have.property("staffs");
    expect(res.body.staffs).to.have.length(3);
  });

  it("shoud throw an error if staff cannot be found via get request", async () => {
    const req = { params: { userId: 11111 } };

    Staff.findByPk.returns(null);

    const result = await adminController.getStaff(req, {}, () => {});

    expectError(result, "Could not find staff.", 404);
  });

  it("should respond with a staff if one is found via get request", async () => {
    const test_id = 11111;
    const req = { params: { userId: test_id } };

    Staff.findByPk.returns({ id: test_id });

    await adminController.getStaff(req, res, () => {});

    expectStaffFound(res, "Staff fetched.", 200, test_id);
  });

  it("shoud throw an error if staff cannot be found via put request", async () => {
    const req = { params: { userId: 11111 } };

    Staff.findByPk.returns(null);

    const result = await adminController.updateStaff(req, {}, () => {});

    expectError(result, "Could not find staff.", 404);
  });

  it("shoud throw an error if staff model is set with invalid data", async () => {
    const test_code = 500;
    const req = {
      params: { userId: 11111 },
      body: { firstName: 11037 },
    };

    Staff.findByPk.returns({
      set: (data) => {
        var x = parseFloat(data.first_name);
        const isInt = !isNaN(data.first_name) && (x | 0) === x;

        if (isInt) {
          const error = Error("type error");
          error.statusCode = test_code;
          throw error;
        }
      },
    });

    const result = await adminController.updateStaff(req, {}, () => {});
    expectError(result, "type error", test_code);
  });

  it("should successfully save the staff model with its new fields given valid data", async () => {
    const test_id = 11111;

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

    Staff.findByPk.returns({
      data: null,
      set: function (other_data) {
        this.data = other_data;
      },
      save: () => {
        return { id: test_id };
      },
    });

    await adminController.updateStaff(req, res, () => {});
    expectStaffFound(res, "Staff updated!", 200, test_id);
  });
});

const res = {
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

function expectError(result, message, code) {
  expect(result).to.be.an("error");
  expect(result).to.have.property("message", message);
  expect(result).to.have.property("statusCode", code);
}

function expectStaffFound(res, message, code, id) {
  expect(res).to.have.property("statusCode", code);
  expect(res.body).to.have.property("message", message);
  expect(res.body).to.have.property("staff");
  expect(res.body.staff).to.have.property("id", id);
}
