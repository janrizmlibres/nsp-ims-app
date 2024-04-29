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
  
  it('should be successful if the user is found and the password is correct', async () => {
    const expectedPassword = await bcrypt.hash('janrizpass', 12);
    Staff.findByPk.returns({hashed_pw: expectedPassword, id: 1, username: 'janrizlibs'});

    await login(
      {
        body: {
          username: 'janrizlibs',
          password: 'janrizpass',
        },
      },
      res,
      () => {}
    )
    
    expect(res.statusCode).to.equal(200);
    expect(res.body.message).to.equal('Authentication successful');
    expect(res.body.token).to.be.a('string');
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

