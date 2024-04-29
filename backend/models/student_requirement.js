import { INTEGER, STRING } from "sequelize";
import sequelize from "../util/database.js";

const StudentRequirement = sequelize.define("student_requirement", {
  id: {
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  requirement_name: {
    type: STRING,
    allowNull: false,
  }
});

export default StudentRequirement;