import { INTEGER, STRING } from "sequelize";
import sequelize from "../util/database.js";

const Student = sequelize.define("student", {
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  lrn: {
    type: STRING,
    allowNull: false,
  },
  category: {
    type: STRING,
    allowNull: false,
  },
  lastName: {
    type: STRING,
    allowNull: false,
  },
  middleName: STRING,
  firstName: {
    type: STRING,
    allowNull: false,
  },
  firstName: STRING,
});

export default Student;
