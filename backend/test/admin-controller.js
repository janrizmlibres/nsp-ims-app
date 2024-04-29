import { expect } from "chai";
import sinon from "sinon";
import { validationResult } from "express-validator";

import * as adminController from "../controllers/admin.js";
import Staff from "../models/staff.js";

describe("Admin Controller (Staffs)", () => {
  it("should be able to get a total of 2 staffs from the database", async () => {
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

    sinon.stub(Staff, "findAll");
    Staff.findAll.returns([{ id: 11111 }, { id: 22222 }, { id: 33333 }]);

    await adminController.getStaffs({}, res, () => {});
    expect(res).to.have.property("statusCode", 200);
    expect(res.body).to.have.property(
      "message",
      "Fetched all staff successfully."
    );
    expect(res.body).to.have.property("staffs");
    expect(res.body.staffs).to.have.length(3);

    Staff.findAll.restore();
  });

  it("shoud throw an error if staff cannot be found via get request", async () => {
    const req = {
      params: { userId: 11111 },
    };

    sinon.stub(Staff, "findByPk");
    Staff.findByPk.returns(null);

    const result = await adminController.getStaff(req, {}, () => {});
    expect(result).to.be.an("error");
    expect(result).to.have.property("message", "Could not find staff.");
    expect(result).to.have.property("statusCode", 404);

    Staff.findByPk.restore();
  });

  it("should respond with a staff if one is found", async () => {
    const test_id = 55555;

    const req = {
      params: { userId: test_id },
    };

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

    sinon.stub(Staff, "findByPk");
    Staff.findByPk.returns({ id: test_id });

    await adminController.getStaff(req, res, () => {});
    expect(res).to.have.property("statusCode", 200);
    expect(res.body).to.have.property("message", "Staff fetched.");
    expect(res.body).to.have.property("staff");
    expect(res.body.staff).to.have.property("id", test_id);

    Staff.findByPk.restore();
  });

  it("shoud throw an error if staff cannot be found via put request", async () => {
    const req = {
      params: { userId: 11111 },
    };

    sinon.stub(Staff, "findByPk");
    Staff.findByPk.returns(null);

    const result = await adminController.updateStaff(req, {}, () => {});
    expect(result).to.be.an("error");
    expect(result).to.have.property("message", "Could not find staff.");
    expect(result).to.have.property("statusCode", 404);

    Staff.findByPk.restore();
  });

  it("shoud throw an error if staff model is set with invalid data", async () => {
    const req = {
      params: { userId: 11111 },
      body: {
        firstName: 11037,
      },
    };

    sinon.stub(Staff, "findByPk");
    Staff.findByPk.returns({
      set: (data) => {
        var x = parseFloat(data.first_name);
        const isInt = !isNaN(data.first_name) && (x | 0) === x;

        if (isInt) {
          const error = Error("type error");
          error.statusCode = 500;
          throw error;
        }
      },
    });

    const result = await adminController.updateStaff(req, {}, () => {});
    expect(result).to.be.an("error");
    expect(result).to.have.property("message", "type error");
    expect(result).to.have.property("statusCode", 500);

    Staff.findByPk.restore();
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

    sinon.stub(Staff, "findByPk");
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
    expect(res).to.have.property("statusCode", 200);
    expect(res.body).to.have.property("message", "Staff updated!");
    expect(res.body).to.have.property("staff");
    expect(res.body.staff).to.have.property("id", test_id);

    Staff.findByPk.restore();
  });
});
