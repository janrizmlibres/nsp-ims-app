import sequelize from "../util/database";
import { injectAll } from "../util/db_injector";
import setAssociations from "../util/associations";

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
