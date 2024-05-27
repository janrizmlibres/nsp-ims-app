import { assert } from 'sinon';
import { expect } from "chai";
import sinon from 'sinon';
import * as volunteerController from '../controllers/volunteer.js';
import Volunteer from "../models/volunteer/volunteer.js";
import VolunteerPersonalInformation from "../models/volunteer/volunteer_personal_information.js";
import VolunteerContactInformation from "../models/volunteer/volunteer_contact_information.js";
import VolunteerSpecialization from "../models/volunteer/volunteer_specialization.js";
import VolunteerAvailability from "../models/volunteer/volunteer_availability.js";
import VolunteerEmergency from "../models/volunteer/volunteer_emergency_contact.js";
import StudentVolunteer from "../models/volunteer/student_volunteer.js";
import ProfessionalVolunteer from "../models/volunteer/professional_volunteer.js";

describe("Volunteer Controller", () => {
  afterEach(() => {
    sinon.restore();
  });

  describe("deleteVolunteer", () => {
    it("should delete a volunteer", async () => {
      const req = mockRequest({ params: { id: 1 } });
      const res = mockResponse();
      const next = sinon.spy();

      sinon.stub(Volunteer, "destroy").returns(Promise.resolve(1)); // Assuming destroy returns the number of destroyed rows

      await volunteerController.deleteVolunteer(req, res, next);
      assert.calledWith(res.status, 200);
      assert.calledWith(res.json, {
        message: "Volunteer archived.",
      });
    });

  it('should throw an error if a volunteer is not found', async () => {
  const req = mockRequest({ params: { id: 89 } });
  const res = mockResponse();
  const next = sinon.spy();

  sinon.stub(Volunteer, 'destroy').returns(Promise.resolve(0)); // No rows deleted

  await volunteerController.deleteVolunteer(req, res, next);
  expect(next.called).to.be.true;
  expect(next.callCount).to.equal(1);
  expect(next.getCall(0).args[0]).to.be.instanceOf(Error);
  expect(next.getCall(0).args[0].message).to.equal("Could not find volunteer.");
  expect(next.getCall(0).args[0].statusCode).to.equal(404);
});
});

  describe('updateVolunteer', () => {
  it('should update a volunteer', async () => {
    const req = mockRequest({
      params: { id: 1 },
      body: {
        volunteerHeader: {
          affiliation: "Professional",
          lastName: "Dela Cruz",
          firstName: "Shelly",
          middleName: "eyy",
          suffix: "Jr.",
        },
        personalInformation: {
          nickname: "Shelly",
          sex: "F",
          birthday: new Date(1980, 1, 1),
          housing: "123 Main St",
          barangay: "Barangay 1",
          city: "City A",
          province: "Province A",
        },
        contactInformation: {
          contactNumber: "+639123456789",
          facebook: "Shelly-Cruz",
          email: "shelly-cruz@example.com",
        },
        emergency: {
          firstName: "John",
          lastName: "Doe",
          contactNumber: "+639123456789",
          relationship: "Brother",
        },
        availability: {
          day: "M, F"
        },
        specialization: {
          area: "LS1-E"
        },
        student: {
          program: "BSCS",
          year: "3rd"
        },
        professional: {
          work: "Programmer"
        }
      }
    });
    const res = mockResponse();
    const next = sinon.spy();

    const mockVolunteer = {
      id: 1 ,
      volunteerHeader: {
        affiliation: "Professional",
        lastName: "Dela Cruz",
        firstName: "Shelly",
        middleName: "eyy",
        suffix: "Jr.",
      },
      personalInformation: {
        nickname: "Shelly",
        sex: "F",
        birthday: new Date(1980, 1, 1),
        housing: "123 Main St",
        barangay: "Barangay 1",
        city: "City A",
        province: "Province A",
      },
      contactInformation: {
        contactNumber: "+639123456789",
        facebook: "Shelly-Cruz",
        email: "shelly-cruz@example.com",
      },
      emergency: {
        firstName: "John",
        lastName: "Doe",
        contactNumber: "+639123456789",
        relationship: "Brother",
      },
      availability: {
        day: "M, F"
      },
      specialization: {
        area: "LS1-E"
      },
      student: {
        program: "BSCS",
        year: "3rd"
      },
      professional: {
        work: "Programmer"
      }
    }; // Mock volunteer data

      sinon
        .stub(Volunteer, "update")
        .returns(Promise.resolve([1, [mockVolunteer]])); // Assuming update returns [affectedCount, rows]

await volunteerController.updateVolunteer(req, res, next);
assert.calledWith(res.json, {
  message: "Volunteer information updated!"});
  });

  it('should handle errors', async () => {
  const req = mockRequest({ params: { id: 231 } });
  const res = mockResponse();
  const next = sinon.spy();
  const error = new Error("Could not find volunteer.");
  error.statusCode = 404; // Add this line

  sinon.stub(Volunteer, 'update').returns(Promise.reject(error));

  await volunteerController.updateVolunteer(req, res, next);
  assert.calledWith(next, sinon.match({ message: "Could not find volunteer.", statusCode: 404 }));
});
});

  describe("getVolunteer", () => {
    it("should get a volunteer by ID", async () => {
      const req = mockRequest({ params: { id: 231 } });
      const res = mockResponse();
      const next = sinon.spy();

      const mockVolunteer = {
        volunteerHeader: {
          affiliation: "Student",
          firstName: "Michael",
          middleName: null,
          lastName: "Jackson",
          suffix: null,
        },
        personalInformation: {
          nickname: "mike",
          birthday: new Date(1990, 11, 30),
          sex: "M",
          housing: "15-26 Street",
          barangay: "Carmen",
          city: "Cagayan de Oro City",
          province: "Misamis Oriental",
        },
        contactInformation: {
          contactNumber: "+639161371327",
          email: "michael_jackson@gmail.com",
        },
        emergency: {
          contactName: "Janet Jackson",
          contactNumber: "+639161371327",
          relationship: "Mother",
        },
        availability: {
          day: "M, F",
        },
        specialization: {
          area: "LS1-E",
        },
        student: {
          program: "BSCS",
          year: "3rd",
        },
        professional: {
          work: "Programmer",
        },
      }; // Mock volunteer data

      sinon.stub(Volunteer, "findByPk").returns(Promise.resolve(mockVolunteer));

      await volunteerController.getVolunteer(req, res, next);
      assert.calledWith(res.status, 200);
      assert.calledWith(res.json, {
        message: "Volunteer fetched.",
        volunteer: mockVolunteer,
      });
    });

    it("should handle errors", async () => {
      const req = mockRequest({ params: { id: 231 } });
      const res = mockResponse();
      const next = sinon.spy();
      const error = new Error("Test error");

      sinon.stub(Volunteer, "findByPk").returns(Promise.reject(error));

      await volunteerController.getVolunteer(req, res, next);
      assert.calledWith(next, error);
    });
  });

  describe("addVolunteer", () => {
    it("should add a volunteer", async () => {
      const req = mockRequest({
        body: {
          volunteerHeader: {
            affiliation: "Student",
            firstName: "Michael",
            middleName: null,
            lastName: "Jackson",
            suffix: null,
          },

          personalInformation: {
            nickname: "mike",
            birthday: new Date(1990, 11, 30),
            sex: "M",
            housing: "15-26 Street",
            barangay: "Carmen",
            city: "Cagayan de Oro City",
            province: "Misamis Oriental",
          },

          contactInformation: {
            contactNumber: "+639161371327",
            email: "michael_jackson@gmail.com",
            facebook: "mikeJackson",
          },

          emergency: {
            lastName: "Jackson",
            firstName: "Katherine",
            middleName: null,
            suffix: null,
            contactNumber: "+639161371327",
            relationship: "Mother",
          },

          availability: {
            day: "M, F",
          },

          specialization: {
            area: "LS1-E",
          },

          student: {
            program: "BSCS",
            year: "3rd",
          },

          professional: {
            work: "Programmer",
          },
        },
      });
      const res = mockResponse();
      const next = sinon.spy();

      const mockVolunteer = {
        volunteerHeader: {
          affiliation: "Student",
          firstName: "Michael",
          middleName: null,
          lastName: "Jackson",
          suffix: null,
        },
        personalInformation: {
          nickname: "mike",
          birthday: new Date(1990, 11, 30),
          sex: "M",
          housing: "15-26 Street",
          barangay: "Carmen",
          city: "Cagayan de Oro City",
          province: "Misamis Oriental",
        },
        contactInformation: {
          contactNumber: "+639161371327",
          email: "michael_jackson@gmail.com",
        },
        emergency: {
          contactName: "Janet Jackson",
          contactNumber: "+639161371327",
          relationship: "Mother",
        },
        availability: {
          day: "M, F",
        },
        specialization: {
          area: "LS1-E",
        },
        student: {
          program: "BSCS",
          year: "3rd",
        },
        professional: {
          work: "Programmer",
        },
      }; // Mock volunteer data

      sinon.stub(Volunteer, "create").returns(Promise.resolve(mockVolunteer));
      sinon
        .stub(VolunteerPersonalInformation, "create")
        .returns(Promise.resolve());
      sinon
        .stub(VolunteerContactInformation, "create")
        .returns(Promise.resolve());
      sinon.stub(VolunteerEmergency, "create").returns(Promise.resolve());
      sinon.stub(VolunteerSpecialization, "create").returns(Promise.resolve());
      sinon.stub(VolunteerAvailability, "create").returns(Promise.resolve());
      sinon.stub(StudentVolunteer, "create").returns(Promise.resolve());
      sinon.stub(ProfessionalVolunteer, "create").returns(Promise.resolve());

      await volunteerController.addVolunteer(req, res, next);
      assert.calledWith(res.status, 200);
      assert.calledWith(res.json, {
        message: "Volunteer record created.",
        volunteer: mockVolunteer,
      });
    });

    it("should handle errors", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const next = sinon.spy();
      const error = new Error("Test error");

      sinon.stub(Volunteer, "create").returns(Promise.reject(error));

      await volunteerController.addVolunteer(req, res, next);
      assert.calledWith(next, error);
    });
  });

  describe("getAllVolunteers", () => {
    it("should get all volunteers", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const mockVolunteers = [
        {
          affiliation: "Student",
          lastName: "Dela Cruz",
          firstName: "Shelly",
          middleName: "eyy",
          suffix: "Jr.",
          nickname: "Shelly",
          sex: "F",
          birthday: new Date(1980, 1, 1),
          housing: "123 Main St",
          barangay: "Barangay 1",
          city: "City A",
          province: "Province A",
          contact: {
            firstName: "John",
            lastName: "Doe",
            contactNumber: "+639123456789",
            relationship: "Brother",
          },
          education: {
            program: "BS PSY",
            year: "1st",
          },
          communication: {
            contactNumber: "+639123456789",
            facebook: "Shelly-Cruz",
            email: "shelly-cruz@example.com",
          },
        },
      ]; // Mock volunteers data

      sinon.stub(Volunteer, "findAll").returns(Promise.resolve(mockVolunteers));

      await volunteerController.getAllVolunteers(req, res, () => {});
      assert.calledWith(res.status, 201);
      assert.calledWith(res.json, {
        message: "Fetched Volunteers Successfully!",
        volunteers: mockVolunteers,
      });
    });

    it("should handle errors", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const next = sinon.spy();

      const error = new Error("Test error");
      sinon.stub(Volunteer, "findAll").returns(Promise.reject(error));

      await volunteerController.getAllVolunteers(req, res, next);
      assert.calledWith(next, error);
    });
  });
});
