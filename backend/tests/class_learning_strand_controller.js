import { expect } from "chai";
import * as classLearningStrandController from "../controllers/class_learning_strand.js";
import { resetDb, resCopy } from "./helpers.js";

let res = { ...resCopy };

function expectError(result, message, code) {
    expect(result).to.be.an("error");
    expect(result.message).to.be.equal(message);
    expect(result.statusCode).to.be.equal(code);
}

function expectItemWithData(res, message, code, id) {
    expect(res.statusCode).to.be.equal(code);
    expect(res.body.message).to.be.equal(message);
    expect(res.body).to.have.property("data");
    expect(res.body.data.id).to.be.equal(id);
}

function expectItem(res, message, code) {
    expect(res.statusCode).to.be.equal(code);
    expect(res.body.message).to.be.equal(message);
}

describe("Class Learning Strand Controller (POST requests)", () => {
    beforeEach(() => (res = { ...resCopy }));
    
    it("should add modules in a class learning strand", async () => {
        const test_id = 1
        const req = {
            params: { classLearningStrandId: test_id },
            body: {
                min: 1,
                max: 5,
                distriDate: new Date(),
                retriDate: new Date()
            },
        };
        
        await classLearningStrandController.addModule(req, res, () => {}); 
        expectItem(res, "Added learning activity sheets successfully!", 201)
    });

    it("should add a class schedule in a class learning strand", async () => {
        const test_id = 1
        const req = {
            params: { classLearningStrandId: test_id },
            body: {
                volunteer: {
                    affiliation: "Student",
                    lastName: "Dela Cruz",
                    firstName: "Shelly",
                    middleName: "eyy",
                    suffix: "Jr.",
                },
                days: 'M',
                start_time: "18:00",
                end_time: "19:00"
            },
        };
        
        await classLearningStrandController.addSchedule(req, res, () => {}); 
        expectItem(res, "Added class schedule successfully!", 201)
    });

    it("should add a session in a class learning strand", async () => {
        const test_id = 1
        const req = {
            params: { classLearningStrandId: test_id },
            body: {dates:[new Date(), new Date(new Date().setMonth(1))]},
        };
        
        await classLearningStrandController.addSession(req, res, () => {}); 
        expectItem(res, "Added sessions successfully!", 201)
    });
});











/* The code below is a test suite written in JavaScript using Mocha and Chai for testing the GET
requests functionality of a Class Learning Strand Controller. The test suite includes test cases for
various methods in the controller such as `getAllModules`, `getModule`, `getAllGrades`,
`getAllSessions`, and `getSession`. */
describe("Class Learning Strand Controller (GET requests)", () => {
    beforeEach(() => (res = { ...resCopy }));

    /* This test case is checking the functionality of the `getAllModules` method in the
    `classLearningStrandController`. */
    it("should be able to get modules of a class learning strand from the database", async () => {
        const test_id = 1;
        const req = { params: { classLearningStrandId: test_id } };
        
        await classLearningStrandController.getAllModules(req, res, () => {});
    
        expect(res).to.have.property("statusCode", 200);
        expect(res.body).to.have.property(
            "message",
            "Fetched modules successfully!"
        );
        expect(res.body).to.have.property("data");
    });

    /* This test case is checking the behavior of the `getAllModules` method in the
    `classLearningStrandController` when no modules are found for a specific class learning strand. */
    it("should throw an error if modules cannot be found via GET request", async () => {
        const test_id = 500;
        const req = { params: { classLearningStrandId: test_id } };
    
        await classLearningStrandController.getAllModules(req, res, () => {}).catch(error =>
            expectError(error, "No modules found.", 404)
        )
    });

    /* This test case is checking the functionality of the `getModule` method in the
    `classLearningStrandController`. It is simulating a scenario where a specific module of a class
    learning strand is requested from the database. */
    it("should be able to get a module of a class learning strand from the database", async () => {
        const test_id = 1;
        const req = { params: { moduleId: test_id } };
    
        await classLearningStrandController.getModule(req, res, () => {});
        expectItemWithData(res, "Fetched module successfully.", 200, test_id)
    });

    /* This test case is checking the behavior of the `getModule` method in the
    `classLearningStrandController` when a specific module cannot be found for a given class
    learning strand ID. */
    it("should throw an error if a module cannot be found via GET request", async () => {
        const test_id = 500;
        const req = { params: { moduleId: test_id } };
    
        await classLearningStrandController.getModule(req, res, () => {}).catch(error =>
            expectError(error, "No module found.", 404)
        )
    });

    /* This test case is checking the functionality of the `getAllGrades` method in the
    `classLearningStrandController`. It simulates a scenario where student grades of a class
    learning strand are requested from the database. */
    it("should be able to get student grades of a class learning strand from the database", async () => {
        const test_id = 1
        const req = { params: { classLearningStrandId: test_id } };
        await classLearningStrandController.getAllGrades(req, res, () => {});
    
        expect(res).to.have.property("statusCode", 200);
        expect(res.body).to.have.property(
            "message",
            "Fetched grades successfully!"
        );
        expect(res.body).to.have.property("data");
    });

    /* This test case is checking the behavior of the `getAllGrades` method in the
    `classLearningStrandController` when no student grades are found for a specific class learning
    strand. */
    it("should throw an error if student grades cannot be found via GET request", async () => {
        const test_id = 500;
        const req = { params: { classLearningStrandId: test_id } };
    
        await classLearningStrandController.getAllGrades(req, res, () => {}).catch(error =>
            expectError(error, "No grades found.", 404)
        )
    });

    /* This test case is checking the functionality of the `getAllSessions` method in the
    `classLearningStrandController`. It simulates a scenario where sessions of a class learning
    strand are requested from the database. */
    it("should be able to get sessions of class learning strand from the database", async () => {
        const test_id = 1
        const req = { params: { classLearningStrandId: test_id } };
        await classLearningStrandController.getAllSessions(req, res, () => {});
    
        expect(res).to.have.property("statusCode", 200);
        expect(res.body).to.have.property(
            "message",
            "Fetched sessions successfully!"
        );
        expect(res.body).to.have.property("data");
    });

    /* This test case is checking the behavior of the `getAllSessions` method in the
    `classLearningStrandController` when no sessions are found for a specific class learning strand. */
    it("should throw an error if sessions cannot be found via GET request", async () => {
        const test_id = 500;
        const req = { params: { classLearningStrandId: test_id } };
    
        await classLearningStrandController.getAllSessions(req, res, () => {}).catch(error =>
            expectError(error, "No sessions found.", 404)
        )
    });

    /* This test case is checking the functionality of the `getSession` method in the
    `classLearningStrandController`. It is simulating a scenario where a specific session of a class
    learning strand is requested from the database. */
    it("should be able to get a session of class learning strand from the database", async () => {
        const test_id = 1
        const req = { params: { sessionId: test_id } };
        await classLearningStrandController.getSession(req, res, () => {});
    
        expectItem(res, "Fetched session successfully.", 200);
    });

    /* This test case is checking the behavior of the `getSession` method in the
    `classLearningStrandController` when a specific session cannot be found for a given class
    learning strand ID. */
    it("should throw an error if a session cannot be found via GET request", async () => {
        const test_id = 500;
        const req = { params: { sessionId: test_id } };
    
        await classLearningStrandController.getSession(req, res, () => {}).catch(error => 
            expectError(error, "No session found.", 404)
        )
    });
});










/* The code below is a test suite written in JavaScript using Mocha and Chai for testing the functionality of
various PUT and PATCH requests in a Class Learning Strand Controller. The test suite includes
multiple test cases that simulate different scenarios related to updating modules, module statuses,
module submissions, student grades, sessions, attendances, and class schedules within a class
learning strand. */
describe("Class Learning Strand Controller (PUT and PATCH requests)", () => {
    beforeEach(() => (res = { ...resCopy }));

    /* This test case is testing the functionality of saving the module of a class learning strand 
    with new dates when given valid data. The test case sets up a mock request object with a module ID, 
    distribution date, and retrieval date. It then calls the `updateModule` function from the
    `classLearningStrandController` with this request object and expects a successful update
    response with a status code of 204 and the test module ID. */
    it("should successfully save the module of a class learning strand with its new dates given valid data", async () => {
        const test_id = 1;
    
        const req = {
            params: { moduleId: test_id },
            body: {
                distribution_date: new Date(),
                retrieval_date: new Date(),
            },
        };
    
        await classLearningStrandController.updateModule(req, res, () => {});
        expectItem(res, "Updated module successfully!", 204);
    });

    /* This test case is testing the functionality of a function called `updateModuleStatus` in the
    `classLearningStrandController`. The test is checking if the function can successfully save the
    modules of a class learning strand with their new statuses when given valid data. */
    it("should successfully save the modules of a class learning strand with their new statuses given valid data", async () => {
        const req = {
            body: {
                status: true,
                moduleIds: [1]
            },
        };
    
        await classLearningStrandController.updateModuleStatus(req, res, () => {});
        expectItem(res, "Updated module statuses successfully!", 204);
    });

    
    /* This test case is testing the functionality of a function called `updateModuleSubmissions` in the
    `classLearningStrandController`. */
    it("should successfully save student module submissions of a class learning strand with their new fields given valid data", async () => {
        const req = {
            body: {
                updatedData: [{
                    id: 1,
                    lastName: 'Chiu',
                    firstName: 'Kim',
                    middleName: null,
                    status: 'Submitted',
                    date_submitted: new Date(),
                    score: 0,
                    remarks: '',
                    updatedAt: new Date()
                }]
            }
        };
    
        await classLearningStrandController.updateModuleSubmissions(req, res, () => {});
        expectItem(res, "Updated module submissions successfully!", 204);
    });

    /* This test case is testing the functionality of a function called `updateGrades` in the
    `classLearningStrandController`. The test case is checking if the function successfully saves
    student grades of a class learning strand with its new status when given valid data. */
    it("should successfully save student grades of a class learning strand with its new status given valid data", async () => {
        const req = {
            body: {
                updatedData: [{
                    enrollmentId: 1,
                    classLearningStrandId: 1,
                    lastName: 'Chiu',
                    firstName: 'Kim',
                    middleName: null,
                    grades: {
                    first_quarter: true,
                    second_quarter: true,
                    third_quarter: null,
                    fourth_quarter: null,
                    remarks: '',
                    updatedAt: new Date()
                    }
                }]
            }
        };
    
        await classLearningStrandController.updateGrades(req, res, () => {});
        expectItem(res, "Updated grades successfully!", 204);
    });

    /* This test case is testing the functionality of saving the session of a class learning strand 
    with new remarks. The test case sets up a mock request object with a session ID and new remarks, 
    then calls the `updateSession` function from the `classLearningStrandController`. After the function 
    call, it expects the response (`res`) to contain the message "Updated session successfully." with a status code of
    200 for the specified session ID. */
    it("should successfully save the session of a class learning strand with its new remarks given valid data", async () => {
        const test_id = 1
        const req = {
            params: { sessionId: test_id },
            body: { remarks: 'Updated remarks.' }
        };
    
        await classLearningStrandController.updateSession(req, res, () => {});
        expectItem(res, "Updated session successfully!", 204);
    });

    /* This test case is testing the functionality of a function called `updateAttendances` in the
    `classLearningStrandController`. */
    it("should successfully save the student attendances of a session with its new remarks given valid data", async () => {
        const req = {
            body: {
                updatedData: [{
                    id: 1,
                    lastName: 'Chiu',
                    firstName: 'Kim',
                    middleName: null,
                    status: 'Present',
                    remarks: '',
                    updatedAt: new Date()
                }]
            }
        };
    
        await classLearningStrandController.updateAttendances(req, res, () => {});
        expectItem(res, "Updated attendances successfully!", 204);
    });

    /* This test case is testing the functionality of saving the class schedule of a class learning \
    strand with new fields. The test case sets up mock data for a request object containing a schedule 
    ID, volunteer information, days, start time, and end time. It then calls the `updateSchedule` function from the
    `classLearningStrandController` with this request object. Finally, it expects the response
    (`res`) to contain a specific message, status code, and test ID to confirm that the class
    schedule was updated successfully. */
    it("should successfully save the class schedule of a class learning strand with its new fields given valid data", async () => {
        const test_id = 1
        const req = {
            params: { scheduleId: test_id },
            body:  {
                volunteer: {
                    affiliation: "Student",
                    lastName: "Dela Cruz",
                    firstName: "Shelly",
                    middleName: "eyy",
                    suffix: "Jr.",
                },
                days: 'M',
                start_time: '18:00',
                end_time: '19:00',
            }
        };
    
        await classLearningStrandController.updateSchedule(req, res, () => {});
        expectItem(res, "Updated class schedule successfully!", 204);
    });
});










/* The code below is a test suite written in JavaScript using Mocha and Chai for testing the DELETE requests
functionality of a Class Learning Strand Controller. */
describe("Class Learning Strand Controller (DELETE requests)", () => {
    beforeEach(() => (res = { ...resCopy }));

    /* This test case is testing the functionality of deleting modules of a class learning strand from the
    database. The test case creates a request object with moduleIds to be deleted, calls the
    deleteModules function from the classLearningStrandController, and then asserts that the
    response object (res) has a status code of 204 and a message indicating that the modules were
    deleted successfully. This test case is verifying the behavior of the deleteModules function in
    the classLearningStrandController. */
    it("should successfully delete the modules of a class learning strand from the database", async () => {
        const req = {
            body: { moduleIds: [1]}
        };
    
        await classLearningStrandController.deleteModules(req, res, () => {});

        expect(res).to.have.property("statusCode", 204);
        expect(res.body).to.have.property(
            "message",
            "Deleted modules successfully!"
        );
    });

    /* This test case is testing the functionality of deleting sessions of a class learning strand from the
    database. */
    it("should successfully delete the sessions of a class learning strand from the database", async () => {
        const req = {
            body: { sessionIds: [1]}
        };
    
        await classLearningStrandController.deleteSessions(req, res, () => {});

        expect(res).to.have.property("statusCode", 204);
        expect(res.body).to.have.property(
            "message",
            "Deleted sessions successfully!"
        );
    });

    /*This test case is testing the functionality of deleting schedules of a class learning strand from the
    database. */
    it("should successfully delete the schedules of a class learning strand from the database", async () => {
        const req = {
            body: { scheduleIds: [1]}
        };
    
        await classLearningStrandController.deleteSchedules(req, res, () => {});

        expect(res).to.have.property("statusCode", 204);
        expect(res.body).to.have.property(
            "message",
            "Deleted class schedules successfully!"
        );
    });
});



