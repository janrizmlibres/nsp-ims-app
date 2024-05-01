import { BOOLEAN, INET, INTEGER, STRING } from "sequelize";
import sequelize from "../util/database.js";

const Student = sequelize.define("student", {
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  canBeCalled: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  canBeNight: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  digitalLiteracy: {
    type: STRING,
    allowNull: false,
  },
  ftl: {
    type: INTEGER,
    allowNull: false,
  },
  bridger: {
    type: STRING,
    allowNull: false,
  },
});

export default Student;
