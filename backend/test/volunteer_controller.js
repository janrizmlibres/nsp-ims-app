import { assert } from 'sinon';
import sinon from 'sinon';
import * as volunteerController from '../controllers/volunteer.js';
import { mockRequest, mockResponse } from 'mock-req-res';
import Volunteer from "../models/volunteer/volunteer.js";

describe('Volunteer Controller', () => {
  afterEach(() => {
    sinon.restore();
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