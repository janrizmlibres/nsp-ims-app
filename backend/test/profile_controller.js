import { expect } from "chai";
import * as profileController from "../controllers/profile.js";
import { resetDb } from "./helpers.js";

let res = null;

describe.skip("Profile Controller (Students)", () => {
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

  it("should be able to fetch all students.", async () => {
    await profileController.getStudents({}, res, () => {});

    expect(res.statusCode).to.be.equal(200);
    expect(res.body).to.have.property("students");
    expect(res.body.message).to.be.equal("Fetched all students successfully.");
  });

  it("should throw an error if student does not exist.", async () => {
    const req = { params: { studentId: 100 } };

    const result = await profileController.getStudent(req, res, () => {});

    expect(result).to.be.an("error");
    expect(result.statusCode).to.be.equal(404);
    expect(result.message).to.be.equal("Student not found.");
  });

  it("should successfully fetch the student if it exists.", async () => {
    const req = { params: { studentId: 2 } };

    await profileController.getStudent(req, res, () => {});

    expect(res.statusCode).to.be.equal(200);
    expect(res.body).to.have.property("student");
    expect(res.body.message).to.be.equal("Student fetched.");
  });

  it("should fail in creating a student when one of the required associations is missing.", async () => {
    const req = { body: { personalInfo: { detail: "random value" } } };

    const result = await profileController.addStudent(req, res, () => {});

    expect(result).to.be.an("error");
    expect(result.statusCode).to.be.equal(500);
  });

  it("should successfully create a student with all required associations.", async () => {
    const req = {
      body: {
        identity: {
          firstName: "Dorian",
          middleName: "Zib",
          lastName: "Zibowski",
          suffixName: "Jr.",
          lrn: 1234567890,
          category: "Out-of-School Youth",
          photoUrl: null,
        },
        personalInfo: {
          birthday: new Date(),
          bloodType: "O+",
          birthCity: "New York City",
          birthProvince: "Misamis Oriental",
          religion: "Roman Catholic",
          sex: "M",
          civilStatus: "Single",
          homeBlkLtSt: "Lackadaisy Hotel",
          homeBarangay: "St. Missouri",
          homeCity: "New York City",
          homeProvince: "Misamis Oriental",
        },
        contactInfo: {
          email: "zibowski.dorian@gmail.com",
          contactNum: "09123456789",
          facebook: 'Dorian "Zib" Zibowski',
        },
        emergencyPerson: {
          firstName: "Mitzi",
          middleName: "Mama",
          lastName: "May",
          suffixName: null,
          contactNum: "09987654321",
          relationship: "Spouse",
        },
        parentalInfo: {
          LastNameF: "May",
          MiddleNameF: "Papa",
          FirstNameF: "Atlas",
          SuffixNameF: "Sr.",
          OccupationF: "Information Broker",
          LastNameM: "Dela Rosa",
          MiddleNameM: null,
          FirstNameM: "Juana",
          SuffixNameM: "I",
          OccupationM: "School Teacher",
        },
        prevSchool: {
          name: "St. Larlar Musician School",
          schoolType: "Private",
          schoolAffiliation: "Non-Sectarian",
          lastSyAttended: "1901-1902",
          highestEducation: "Secondary Education",
          gradeStopped: "Grade 10",
          reason: "Sleeps anywhere",
          street: "Marigold St.",
          city: "Cagayan de Oro City",
          province: "Misamis Oriental",
        },
      },
    };

    await profileController.addStudent(req, res, () => {});

    expect(res.statusCode).to.be.equal(200);
    expect(res.body).to.have.property("student");
    expect(res.body.message).to.be.equal("Student record created.");
  });

  it("should fail to update student if it does not exist.", async () => {
    const req = { params: { studentId: 100 } };

    const result = await profileController.updateStudent(req, res, () => {});

    expect(result).to.be.an("error");
    expect(result.statusCode).to.be.equal(404);
    expect(result.message).to.be.equal("Student not found.");
  });

  it("should update student information if it the student exists.", async () => {
    const req = {
      file: null,
      params: { studentId: 4 },
      body: {
        identity: {
          firstName: "Husker",
          lastName: "Dusk",
          lrn: 987654321,
          category: "Indigenous People",
          photoUrl: "images/juan.jpg",
        },
        personalInfo: {
          birthday: new Date(),
          birthCity: "New York City",
          birthProvince: "Misamis Oriental",
          sex: "M",
          civilStatus: "Single",
          homeBlkLtSt: "Lackadaisy Hotel",
          homeBarangay: "St. Missouri",
          homeCity: "New York City",
          homeProvince: "Misamis Oriental",
        },
        contactInfo: { contactNum: "09987654321" },
        emergencyPerson: {
          firstName: "Angel",
          lastName: "Dust",
          contactNum: "09987654321",
          relationship: "Spouse",
        },
        prevSchool: {
          name: "Hazbin School",
          schoolType: "Public",
          schoolAffiliation: "Non-Sectarian",
          lastSyAttended: "2020-2021",
          highestEducation: "Secondary Education",
          gradeStopped: "Grade 10",
          reason: "Troublemaker",
          street: "St. Missouri",
          city: "New York City",
        },
      },
    };

    await profileController.updateStudent(req, res, () => {});

    expect(res.statusCode).to.be.equal(200);
    expect(res.body.message).to.be.equal("Student information updated.");
  });
});
