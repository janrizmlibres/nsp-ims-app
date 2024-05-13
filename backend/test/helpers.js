import sequelize from "../util/database.js";
import { injectAll } from "../util/db_injector.js";
import setAssociations from "../util/associations.js";

export async function resetDb() {
  await sequelize.query("SET FOREIGN_KEY_CHECKS=0");
  await sequelize.drop();
  await sequelize.query("SET FOREIGN_KEY_CHECKS=1");
  setAssociations();
  await sequelize.sync({ force: true });
  await injectAll();
}

export const resCopy = {
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
