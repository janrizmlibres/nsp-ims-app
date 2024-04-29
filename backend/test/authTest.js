import sinon from 'sinon';
import { describe, it } from 'mocha';
import { expect } from 'chai';

import { login } from '../controllers/auth.js';
import Staff from '../models/staff.js';
import bcrypt from 'bcrypt'

describe('Auth Controller', () => {
  beforeEach(() => {
    sinon.stub(Staff, "findByPk");
  });

  afterEach(() => {
    Staff.findByPk.restore();
  });


  it('should return an error if the user is not found', async () => {
    Staff.findByPk.returns(null);
    
    const results = await login(
      {
        body: {
          username: 'test',
          password: 'test',
        },
      },
      res,
      () => {}
    )
    
    expect(results.statusCode).to.equal(401);
    expect(results.message).to.equal('Authentication failed. User not found.');
  });
  
  it('should return an error if the password is incorrect', async () => {
    const expectedPassword = await bcrypt.hash('janrizlibs', 12);
    Staff.findByPk.returns({hashed_pw: expectedPassword});
    
    const results = await login(
      {
        body: {
          username: 'janrizlibs',
          password: 'test',
        },
      },
      res,
      () => {}
    )
    
    expect(results.statusCode).to.equal(401);
    expect(results.message).to.equal('Authentication failed. Wrong password.');
  });
});

const res = {
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

