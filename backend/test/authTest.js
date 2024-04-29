import sinon from 'sinon';
import { describe, it } from 'mocha';
import { expect } from 'chai';

import { login } from '../controllers/auth.js';
import Staff from '../models/staff.js';
import bcrypt from 'bcrypt'
import { signup } from '../controllers/auth.js';

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

describe('Signup', () => {
  beforeEach(() => {
    sinon.stub(Staff, "create");
    sinon.stub(Staff, "findByPk");
  });

  afterEach(() => {
    Staff.create.restore();
    Staff.findByPk.restore();
  });

  it('should create a new user if the input is valid', async () => {
    const hashedPassword = await bcrypt.hash('test', 12);
    Staff.findByPk.returns(null);
    Staff.create.returns({ id: 1, hashed_pw: hashedPassword });

    const req = {
      body: {
        password: 'test',
        firstName: 'John',
        middleName: '',
        lastName: 'Doe',
        suffixName: '',
        position: '',
        email: 'john.doe@example.com',
        contactNum: '',
      },
    };

    await signup(req, res, () => {});
    console.log(res)
    expect(res.statusCode).to.equal(201);
    expect(res.body.message).to.equal('User created!');
    expect(res.body.user).to.be.an('object');
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

