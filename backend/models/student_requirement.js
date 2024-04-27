import { INTEGER, STRING, DATE } from "sequelize";
import sequelize from "../util/database.js";

const StudentRequirement = sequelize.define("student-requirement", {
  id: {
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  student_requirement: {
    type: STRING,
    allowNull: false,
  }
});

export default StudentRequirement;