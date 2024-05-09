import { describe, it } from "mocha";
import { expect } from "chai";

import { login } from "../controllers/auth.js";
import { signup } from "../controllers/auth.js";

import sequelize from "../util/database.js";
import setAssociations from "../util/associations.js";
import { injectAll } from "../util/db_injector.js";

describe("Auth Controller", () => {
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

  it("should return an error if the user is not found", async () => {
    const results = await login(
      {
        body: {
          userId: "test",
          password: "test",
        },
      },
      res,
      () => {}
    );

    expect(results.statusCode).to.equal(401);
    expect(results.message).to.equal("Authentication failed. User not found.");
  });

  it("should return an error if the password is incorrect", async () => {
    const results = await login(
      {
        body: {
          userId: "91267",
          password: "test",
        },
      },
      res,
      () => {}
    );
    expect(results.statusCode).to.equal(401);
    expect(results.message).to.equal("Authentication failed. Wrong password.");
  });

  it("should be successful if the user is found and the password is correct", async () => {
    await login(
      {
        body: {
          userId: "53697",
          password: "nazpass",
        },
      },
      res,
      () => {}
    );

    expect(res.statusCode).to.equal(200);
    expect(res.body.message).to.equal("Authentication successful");
    expect(res.body.token).to.be.a("string");
  });

  it("should create a new user if the input is valid", async () => {
    const req = {
      body: {
        password: "testpass",
        firstName: "Husker",
        middleName: "Angel",
        lastName: "Dusk",
        suffixName: "Sr",
        position: "Overlord",
        email: "test@test.com",
        contactNum: "09123456789",
      },
    };

    await signup(req, res, () => {});
    expect(res.statusCode).to.equal(201);
    expect(res.body.message).to.equal("User created!");
    expect(res.body.user).to.be.an("object");
  });
});

let res = {
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

async function resetDb() {
  await sequelize.query("SET FOREIGN_KEY_CHECKS=0");
  await sequelize.drop();
  await sequelize.query("SET FOREIGN_KEY_CHECKS=1");
  setAssociations();
  await sequelize.sync({ force: true });
  await injectAll();
}
