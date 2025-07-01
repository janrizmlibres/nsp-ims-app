import { INTEGER, STRING } from "sequelize";
import sequelize from "../../../../util/database.js";

export const StudentVolunteer = sequelize.define("student_volunteer", {
  id: {
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  program: {
    type: STRING,
    allowNull: false,
  },
  year: {
    type: STRING,
    allowNull: false,
  },
});
