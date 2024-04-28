import { INTEGER, STRING, DATE } from "sequelize";
import sequelize from "../util/database.js";

const AcademicYear = sequelize.define("academic_year", {
  id: {
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  batch_number: {
    type: INTEGER,
    allowNull: false
  },
  start_date: {
    type: DATE,
    allowNull: false
  },
  end_date: {
    type: DATE,
    allowNull: false
  }
});

export default AcademicYear;