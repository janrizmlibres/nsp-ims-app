import { DATE, ENUM, INTEGER, STRING } from "sequelize";
import sequelize from "../../../../util/database.js";

export const PersonalInfo = sequelize.define("personal_info", {
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  birthday: {
    type: DATE,
    allowNull: false,
  },
  bloodType: {
    type: ENUM,
    values: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  },
  birthCity: {
    type: STRING,
    allowNull: false,
  },
  birthProvince: {
    type: STRING,
    allowNull: false,
  },
  religion: STRING,
  sex: {
    type: ENUM("M", "F"),
    allowNull: false,
  },
  civilStatus: {
    type: ENUM,
    values: ["Married", "Widowed", "Separated", "Divorced", "Single"],
    allowNull: false,
  },
  homeDistrict: STRING,
  homeBlkLtSt: {
    type: STRING,
    allowNull: false,
  },
  homeBarangay: {
    type: STRING,
    allowNull: false,
  },
  homeCity: {
    type: STRING,
    allowNull: false,
  },
  homeProvince: {
    type: STRING,
    allowNull: false,
  },
});
