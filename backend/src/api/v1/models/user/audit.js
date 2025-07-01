import { STRING, INTEGER, DATE } from "sequelize";
import sequelize from "../../../../util/database.js";

export const Audit = sequelize.define("audit", {
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: STRING,
    allowNull: false,
  },
  date: {
    type: DATE,
    allowNull: false,
  },
});
