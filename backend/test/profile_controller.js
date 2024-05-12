import { expect } from "chai";

import * as profileController from "../controllers/profile.js";

import sequelize from "../util/database.js";
import { injectAll } from "../util/db_injector.js";
import setAssociations from "../util/associations.js";

describe("Profile Controller (Students)", () => {
  before(async () => await resetDb());
  after(async () => await resetDb());
});
