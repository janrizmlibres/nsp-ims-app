import { expect } from "chai";
import * as enrollmentController from "../controllers/enrollment.js";
import { resetDb } from "./helpers.js";

let res = null

describe("Enrollment Controller", () => {
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


  it("should enroll learners", async () => {
    const req = {
      body: {
        learners: [
          JSON.stringify({
            studentId: 1,
            selectedSchoolLevelId: 1,
            fltPretestScore: 80,
            selectedRegularity: "Regular",
            selectedRemarks: "Good",
          }),
        ],
      },
      files: [],
    };
    
    await enrollmentController.enrollLearners(req, res, () => {});
    expect(res.statusCode).to.be.equal(201);
    expect(res.body.message).to.be.equal("Enrolled learners successfully!");
  });

  it("should get all enrolled on term", async () => {
    const req = {
      params: {
        termID: 1, // Assuming term with ID 1 exists
      },
    };

    
    await enrollmentController.getAllEnrolledOnTerm(req, res, () => {});
    expect(res.statusCode).to.be.equal(200);
    expect(res.body.message).to.be.equal("Fetched all active students successfully!");
  });

  it("should update enrollment", async () => {
    const req = {
      params: {
        enrollmentId: 1, // Assuming enrollment with ID 1 exists
      },
      body: {
        fltPretestScore: 85,
        selectedRegularity: "Regular",
        selectedRemarks: "Very Good",
        enrollmentForm: null,
      },
      files: [], // Assuming no files are uploaded
    };

    await enrollmentController.updateEnrollment(req, res, () => {});

    expect(res.statusCode).to.be.equal(201);
    expect(res.body.message).to.be.equal("Updated learner enrollment successfully!");
  });

  it("should get enrolled", async () => {
    const req = {
      params: {
        studentId: 1, // Assuming student with ID 1 exists
        enrollmentId: 1, // Assuming enrollment with ID 1 exists
      },
    };

    await enrollmentController.getEnrolled(req, res, () => {});

    expect(res.statusCode).to.be.equal(200);
    expect(res.body.message).to.be.equal("Fetched enrolled student successfully!");
  });

  it("should change enrollment status", async () => {
    const req = {
      params: {
        enrollmentId: 1, // Assuming enrollment with ID 1 exists
      },
      body: {
        statusToChange: "Inactive",
      },
    };

    await enrollmentController.changeEnrollmentStatus(req, res, () => {});
    expect(res.statusCode).to.be.equal(201);
    expect(res.body.message).to.be.equal("Updated learner enrollment successfully!");
  });
});