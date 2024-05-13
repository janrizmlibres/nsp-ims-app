import { expect } from "chai";
import * as profileController from "../controllers/profile.js";
import { resCopy, resetDb } from "./helpers.js";

describe("Profile Controller (Students)", () => {
  before(async () => await resetDb());
  after(async () => await resetDb());

  it("should create a new student given that all input fields are valid", async () => {
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
          birthBarangay: "Iponan",
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
          lastSyAttended: "1901 - 1902",
          highestEducation: "Secondary Education",
          gradeStopped: "Grade 10",
          reason: "Sleeps anywhere",
          street: "Marigold St.",
          barangay: "Balulang",
          city: "Cagayan de Oro City",
          province: "Misamis Oriental",
        },
      },
    };

    const res = { ...resCopy };
    await profileController.addStudent(req, res, () => {});

    expect(res).to.have.property("statusCode", 200);
    expect(res.body).to.have.property("message", "Student created.");
  });
});
