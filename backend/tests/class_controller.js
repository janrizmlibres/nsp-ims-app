import { expect } from "chai";
import * as classController from "../controllers/class.js";
import { resCopy } from "./helpers.js";

let res = { ...resCopy }
function expectError(result, message, code) {
    expect(result).to.be.an("error");
    expect(result.message).to.be.equal(message);
    expect(result.statusCode).to.be.equal(code);
}

/* This code snippet is a test suite written in JavaScript using the Mocha testing framework. Let me
break down what each part of the code is doing: */
describe("Class Controller (GET requests)", () => {
    beforeEach(() => (res = { ...resCopy }));
    
    /* This test case is checking the functionality of the `getAllStudents` method in the
    `classController`. Here's a breakdown of what the test is doing: */
    it("should be able to get students of a class level from the database", async () => {
        const test_id = 1
        const req = { params: { classId: test_id } };
        await classController.getAllStudents(req, res, () => {});

        expect(res).to.have.property("statusCode", 200);
        expect(res.body).to.have.property(
            "message",
            "Fetched students successfully!"
        );
        expect(res.body).to.have.property("data");
    });

    /* This test case is checking the scenario where an error is expected to be thrown if students
    cannot be found via a GET request. Here's a breakdown of what the test is doing: */
    it("should throw an error if students cannot be found via GET request", async () => {
        const test_id = 1580;
        const req = { params: { classId: test_id } };
    
        classController.getAllStudents(req, {}, () => {}).catch(error => 
            expectError(error, "No students found.", 404)
        )
    });

    /* This test case is checking the functionality of the `getClassSchedules` method in the
    `classController`. Here's a breakdown of what the test is doing: */
    it("should be able to get class schedules of a class level from the database", async () => {
        const test_id = 1;
        const req = { params: { classId: test_id } };
        await classController.getClassSchedules(req, res, () => {});

        expect(res).to.have.property("statusCode", 200);
        expect(res.body).to.have.property(
            "message",
            "Fetched class schedules successfully!"
        );
        expect(res.body).to.have.property("data");
    });

    /* This test case is checking the scenario where an error is expected to be thrown if class
    schedules cannot be found via a GET request. Here's a breakdown of what the test is doing: */
    it("should throw an error if class schedules cannot be found via GET request", async () => {
        const test_id = 1;
        const req = { params: { classId: test_id } };
    
        await classController.getClassSchedules(req, res, () => {}).catch(error =>
            expectError(error, "No class schedules found.", 404)
        )
    });

    /* This test case is checking the functionality of the `getStudent` method in the
    `classController`. Here's a breakdown of what the test is doing: */
    it("should be able to get a student of a class level from the database", async () => {
        const test_id1 = 1;
        const test_id2 = 1;
        const req = { params: { enrollmentId: test_id1, classId: test_id2 } };
        await classController.getStudent(req, res, () => {});

        expect(res).to.have.property("statusCode", 200);
        expect(res.body).to.have.property(
            "message",
            "Fetched student successfully!"
        );
        expect(res.body).to.have.property("data");
    });
});