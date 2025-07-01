import { ENUM, INTEGER, STRING, TEXT } from "sequelize";
import sequelize from "../../../../util/database.js";

export const PreviousSchool = sequelize.define("previous_school", {
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
  schoolType: {
    type: ENUM("Public", "Private"),
    allowNull: false,
  },
  schoolAffiliation: {
    type: ENUM("Sectarian", "Non-Sectarian"),
    allowNull: false,
  },
  lastSyAttended: {
    type: STRING,
    allowNull: false,
  },
  highestEducation: {
    type: STRING,
    allowNull: false,
  },
  gradeStopped: {
    type: STRING,
    allowNull: false,
  },
  reason: {
    type: TEXT,
    allowNull: false,
  },
  street: {
    type: STRING,
    allowNull: false,
  },
  city: {
    type: STRING,
    allowNull: false,
  },
  province: {
    type: STRING,
    allowNull: false,
  },
});
