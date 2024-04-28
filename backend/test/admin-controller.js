import { expect } from "chai";
import sinon from "sinon";

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

  it("shoud throw an error if staff is not found", async () => {
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
});
