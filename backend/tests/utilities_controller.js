import { describe, it } from "mocha";
import { expect } from "chai";

import * as utilitiesController from "../controllers/utilities.js";
import { resetDb } from "./helpers.js";

let res = null;

describe.skip("Utilities Controller", () => {
  before(async () => await resetDb());
  after(async () => await resetDb());

  beforeEach(
    () =>
      (res = {
        statusCode: null,
        body: null,
        status: function (code) {
          this.statusCode = code;
          return this;
        },
        json: function (data) {
          this.body = data;
        },
      })
  );

  it("should add an academic term.", async () => {
    const req = {
      body: {
        academic_year: "2024-2025",
        start_date: new Date("2024-06-01"),
        end_date: new Date("2025-03-31"),
        status: true,
      },
    };

    await utilitiesController.addTerm(req, res, () => {});
    expect(res.statusCode).to.equal(201);
    expect(res.body.message).to.equal("New Academic Term Created!");
  });

  it("should update an academic term.", async () => {
    const req = {
      body: {
        start_date: new Date("2023-06-02"),
        end_date: new Date("2024-03-31"),
      },
      params: {
        termId: 8,
      },
    };

    await utilitiesController.updateTerm(req, res, () => {});
    expect(res.statusCode).to.equal(200);
    expect(res.body.message).to.equal("Academic Term updated successfully!");
  });

  it("should add a learning strand.", async () => {
    const req = {
      body: {
        code: "LS8",
        name: "Test 8",
      },
    };

    await utilitiesController.addLearningStrand(req, res, () => {});
    expect(res.statusCode).to.equal(201);
    expect(res.body.message).to.equal("New Learning Strand Created!");
  });

  it("should get all learning strands.", async () => {
    const req = {
      body: {},
    };

    await utilitiesController.getLearningStrands(req, res, () => {});
    expect(res.statusCode).to.equal(200);
    expect(res.body.message).to.equal("Learning Strands fetched successfully!");
  });

  it("should update a learning strand.", async () => {
    const req = {
      body: {
        code: "HVE",
        name: "Homeroom or Values Education",
      },
      params: {
        strandId: 8,
      },
    };

    await utilitiesController.updateLearningStrand(req, res, () => {});
    expect(res.statusCode).to.equal(200);
    expect(res.body.message).to.equal("Learning Strand updated successfully!");
  });

  it("should delete a learning strand.", async () => {
    const req = {
      params: {
        strandId: 8,
      },
    };

    await utilitiesController.deleteLearningStrand(req, res, () => {});
    expect(res.statusCode).to.equal(200);
    expect(res.body.message).to.equal("Learning Strand deleted successfully!");
  });

  it("should add a student requirement.", async () => {
    const req = {
      body: {
        requirement_name: "This is a test",
      },
    };

    await utilitiesController.addRequirement(req, res, () => {});
    expect(res.statusCode).to.equal(201);
    expect(res.body.message).to.equal("New Student Requirement Created!");
  });

  it("should get all student requirements.", async () => {
    const req = {
      body: {},
    };

    await utilitiesController.getRequirements(req, res, () => {});
    expect(res.statusCode).to.equal(200);
    expect(res.body.message).to.equal(
      "Student Requirements fetched successfully!"
    );
  });

  it("should update a student requirement.", async () => {
    const req = {
      body: {
        requirement_name: "Enrollment Forms",
      },
      params: {
        requirementId: 1,
      },
    };

    await utilitiesController.updateRequirement(req, res, () => {});
    expect(res.statusCode).to.equal(200);
    expect(res.body.message).to.equal(
      "Student Requirement updated successfully!"
    );
  });

  it("should delete a student requirement.", async () => {
    const req = {
      params: {
        requirementId: 1,
      },
    };

    await utilitiesController.deleteRequirement(req, res, () => {});
    expect(res.statusCode).to.equal(200);
    expect(res.body.message).to.equal(
      "Student Requirement deleted successfully!"
    );
  });

  it("should add a student category.", async () => {
    const req = {
      body: {
        category_name: "This is a category",
      },
    };

    await utilitiesController.addCategory(req, res, () => {});
    expect(res.statusCode).to.equal(201);
    expect(res.body.message).to.equal("New Student Category Created!");
  });

  it("should get all student categories.", async () => {
    const req = {
      body: {},
    };

    await utilitiesController.getCategories(req, res, () => {});
    expect(res.statusCode).to.equal(200);
    expect(res.body.message).to.equal(
      "Student Categories fetched successfully!"
    );
  });

  it("should update a student category.", async () => {
    const req = {
      body: {
        category_name: "Out of School Individuals",
      },
      params: {
        categoryId: 1,
      },
    };

    await utilitiesController.updateCategory(req, res, () => {});
    expect(res.statusCode).to.equal(200);
    expect(res.body.message).to.equal("Student Category updated successfully!");
  });

  it("should delete a student category.", async () => {
    const req = {
      params: {
        categoryId: 1,
      },
    };

    await utilitiesController.deleteCategory(req, res, () => {});
    expect(res.statusCode).to.equal(200);
    expect(res.body.message).to.equal("Student Category deleted successfully!");
  });
});
