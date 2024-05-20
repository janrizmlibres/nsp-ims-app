import { expect } from "chai";
import * as volunteerController from "../controllers/volunteer.js";
import { resetDb, resCopy } from "./helpers.js";

let res = { ...resCopy };

describe("Volunteer Controller", () => {
  before(async () => await resetDb());
  after(async () => await resetDb());

  it("should update a volunteer's name given valid data", async () => {
    const test_id = 2; // replace with a valid volunteer id
    const req = {
      params: { volunteerId: test_id },
      body: {
        Volunteer: {
          lastName: "NewLastName",
          firstName: "NewFirstName",
          middleName: "NewMiddleName"
        }
      },
    };

    await volunteerController.updateVolunteer(req, res, () => {});

    expect(res.statusCode).to.be.equal(200);
    expect(res.body.message).to.be.equal("Volunteer updated.");
  });
});