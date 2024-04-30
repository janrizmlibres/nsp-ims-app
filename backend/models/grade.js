import { INTEGER, STRING, DATE } from "sequelize";
import sequelize from "../util/database.js";
import Module from "./module.js";
import Class from "./class.js";

const Grade = sequelize.define("grade", {
  id: {
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  // studentId: {
  //     type: INTEGER,
  //     references: {
  //     model: Student,
  //     key: 'id',
  //     },
  // },
  classId: {
    type: INTEGER,
    references: {
      model: Class,
      key: "id",
    },
  },
  first_quarter: STRING,
  second_quarter: STRING,
  third_quarter: STRING,
  fourth_quarter: STRING,
  remarks: STRING,
});

export default Grade;
