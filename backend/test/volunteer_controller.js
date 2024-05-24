import { assert } from 'sinon';
import sinon from 'sinon';
import * as volunteerController from '../controllers/volunteer.js';
import { mockRequest, mockResponse } from 'mock-req-res';
import Volunteer from "../models/volunteer/volunteer.js";
import VolunteerPersonalInformation from '../models/volunteer/volunteer_personal_information.js';
import VolunteerContactInformation from "../models/volunteer/volunteer_contact_information.js";
import VolunteerSpecialization from "../models/volunteer/volunteer_specialization.js";
import VolunteerAvailability from "../models/volunteer/volunteer_availability.js";
import VolunteerEmergency from "../models/volunteer/volunteer_emergency_contact.js";
import StudentVolunteer from "../models/volunteer/student_volunteer.js";
import ProfessionalVolunteer from "../models/volunteer/professional_volunteer.js";

describe('Volunteer Controller', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('deleteVolunteer', () => {
  it('should delete a volunteer', async () => {
    const req = mockRequest({ params: { id: 1 } });
    const res = mockResponse();
    const next = sinon.spy();

    sinon.stub(Volunteer, 'destroy').returns(Promise.resolve(1)); // Assuming destroy returns the number of destroyed rows

    await volunteerController.deleteVolunteer(req, res, next);
    assert.calledWith(res.status, 200);
    assert.calledWith(res.json, {
      message: "Volunteer archived." ,
    });
  });

  it('should handle errors', async () => {
    const req = mockRequest({ params: { id: 231 } });
    const res = mockResponse();
    const next = sinon.spy();

    const error = new Error('Test error');
    sinon.stub(Volunteer, 'destroy').returns(Promise.reject(error));

    await volunteerController.deleteVolunteer(req, res, next);
    assert.calledWith(next, error);
  });
});

  describe('updateVolunteer', () => {
  it('should update a volunteer', async () => {
    const req = mockRequest({
      params: { id: 231 },
      body: {
        volunteerHeader: {
          volunteerId: 231,
          affiliation: "Professional",
          firstName: "Michael",
          middleName: null,
          lastName: "Jackson",
          suffix: null
        },
        personalInformation: {
          nickname: "mike",
          birthday: new Date(1990, 11, 30),
          sex: "M",
          housing: "15-26 Street",
          barangay: "Carmen",
          city: "Cagayan de Oro City",
          province: "Misamis Oriental"
        },
        contactInformation: {
          contactNumber: "+639161371327",
          email: "michael_jackson@gmail.com"
        },
        emergency: {
          contactName: "Janet Jackson",
          contactNumber: "+639161371327",
          relationship: "Mother"
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
      volunteerHeader: {
        volunteerId: 231,
        affiliation: "Professional",
        firstName: "Michael",
        middleName: null,
        lastName: "Jackson",
        suffix: null
      },
      personalInformation: {
        nickname: "mike",
        birthday: new Date(1990, 11, 30),
        sex: "M",
        housing: "15-26 Street",
        barangay: "Carmen",
        city: "Cagayan de Oro City",
        province: "Misamis Oriental"
      },
      contactInformation: {
        contactNumber: "+639161371327",
        email: "michael_jackson@gmail.com"
      },
      emergency: {
        contactName: "Janet Jackson",
        contactNumber: "+639161371327",
        relationship: "Mother"
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

    sinon.stub(Volunteer, 'update').returns(Promise.resolve([1, [mockVolunteer]])); // Assuming update returns [affectedCount, rows]

    await volunteerController.updateVolunteer(req, res, next);
    assert.calledWith(res.status, 200);
    assert.calledWith(res.json, {
      message: "Volunteer updated.",
      volunteer: mockVolunteer,
    });
  });

  it('should handle errors', async () => {
    const req = mockRequest({ params: { id: 231 } });
    const res = mockResponse();
    const next = sinon.spy();
    const error = new Error('Test error');

    sinon.stub(Volunteer, 'update').returns(Promise.reject(error));

    await volunteerController.updateVolunteer(req, res, next);
    assert.calledWith(next, error);
  });
});

  describe('getVolunteer', () => {
  it('should get a volunteer by ID', async () => {
    const req = mockRequest({ params: { id: 231 } });
    const res = mockResponse();
    const next = sinon.spy();

    const mockVolunteer = {
      volunteerHeader: {
        volunteerId: 231,
        affiliation: "Student",
        firstName: "Michael",
        middleName: null,
        lastName: "Jackson",
        suffix: null
      },
      personalInformation: {
        nickname: "mike",
        birthday: new Date(1990, 11, 30),
        sex: "M",
        housing: "15-26 Street",
        barangay: "Carmen",
        city: "Cagayan de Oro City",
        province: "Misamis Oriental"
      },
      contactInformation: {
        contactNumber: "+639161371327",
        email: "michael_jackson@gmail.com"
      },
      emergency: {
        contactName: "Janet Jackson",
        contactNumber: "+639161371327",
        relationship: "Mother"
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

    sinon.stub(Volunteer, 'findByPk').returns(Promise.resolve(mockVolunteer));

    await volunteerController.getVolunteer(req, res, next);
    assert.calledWith(res.status, 200);
    assert.calledWith(res.json, {
      message: "Volunteer fetched.",
      volunteer: mockVolunteer,
    });
  });

  it('should handle errors', async () => {
    const req = mockRequest({ params: { id: 231 } });
    const res = mockResponse();
    const next = sinon.spy();
    const error = new Error('Test error');

    sinon.stub(Volunteer, 'findByPk').returns(Promise.reject(error));

    await volunteerController.getVolunteer(req, res, next);
    assert.calledWith(next, error);
  });
});

  describe('addVolunteer', () => {
  it('should add a volunteer', async () => {
    const req = mockRequest({
      body: {
        volunteerHeader: {
          volunteerId: 231,
          affiliation: "Student",
          firstName: "Michael",
          middleName: null,
          lastName: "Jackson",
          suffix: null
        },
      
        personalInformation: {
          nickname: "mike",
          birthday: new Date(1990, 11, 30),
          sex: "M",
          housing: "15-26 Street",
          barangay: "Carmen",
          city: "Cagayan de Oro City",
          province: "Misamis Oriental"
        },
      
        contactInformation: {
          contactNumber: "+639161371327",
          email: "michael_jackson@gmail.com",
          facebook: "mikeJackson"
        },
      
        emergency: {
          lastName: "Jackson",
          firstName: "Katherine",
          middleName: null,
          suffix: null,
          contactNumber: "+639161371327",
          relationship: "Mother"
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
          work: "Programmer",
        }
      },
    });
    const res = mockResponse();
    const next = sinon.spy();

    const mockVolunteer = {
  volunteerHeader: {
    volunteerId: 231,
    affiliation: "Student",
    firstName: "Michael",
    middleName: null,
    lastName: "Jackson",
    suffix: null
  },
  personalInformation: {
    nickname: "mike",
    birthday: new Date(1990, 11, 30),
    sex: "M",
    housing: "15-26 Street",
    barangay: "Carmen",
    city: "Cagayan de Oro City",
    province: "Misamis Oriental"
  },
  contactInformation: {
    contactNumber: "+639161371327",
    email: "michael_jackson@gmail.com"
  },
  emergency: {
    contactName: "Janet Jackson",
    contactNumber: "+639161371327",
    relationship: "Mother"
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

    sinon.stub(Volunteer, 'create').returns(Promise.resolve(mockVolunteer));
    sinon.stub(VolunteerPersonalInformation, 'create').returns(Promise.resolve());
    sinon.stub(VolunteerContactInformation, 'create').returns(Promise.resolve());
    sinon.stub(VolunteerEmergency, 'create').returns(Promise.resolve());
    sinon.stub(VolunteerSpecialization, 'create').returns(Promise.resolve());
    sinon.stub(VolunteerAvailability, 'create').returns(Promise.resolve());
    sinon.stub(StudentVolunteer, 'create').returns(Promise.resolve());
    sinon.stub(ProfessionalVolunteer, 'create').returns(Promise.resolve());

    await volunteerController.addVolunteer(req, res, next);
    assert.calledWith(res.status, 200);
    assert.calledWith(res.json, {
      message: "Volunteer record created.",
      volunteer: mockVolunteer,
    });
  });

  it('should handle errors', async () => {
    const req = mockRequest();
    const res = mockResponse();
    const next = sinon.spy();
    const error = new Error('Test error');

    sinon.stub(Volunteer, 'create').returns(Promise.reject(error));

    await volunteerController.addVolunteer(req, res, next);
    assert.calledWith(next, error);
  });
});

  describe('getAllVolunteers', () => {
    it('should get all volunteers', async () => {
      const req = mockRequest();
      const res = mockResponse();
      const mockVolunteers = [
  {
    volunteerId: 1,
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

      sinon.stub(Volunteer, 'findAll').returns(Promise.resolve(mockVolunteers));

      await volunteerController.getAllVolunteers(req, res, () => {});
      assert.calledWith(res.status, 201);
      assert.calledWith(res.json, {
        message: "Fetched Volunteers Successfully!",
        volunteers: mockVolunteers
      });
    });

    it('should handle errors', async () => {
      const req = mockRequest();
      const res = mockResponse();
      const next = sinon.spy();

      const error = new Error('Test error');
      sinon.stub(Volunteer, 'findAll').returns(Promise.reject(error));

      await volunteerController.getAllVolunteers(req, res, next);
      assert.calledWith(next, error);
    });
  });
});