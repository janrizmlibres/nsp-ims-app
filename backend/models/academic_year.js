import { INTEGER, DATE } from "sequelize";
import sequelize from "../util/database.js";

const AcademicYear = sequelize.define("academic-year", {
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
  start_date: DATE,
  end_date: DATE
});

export default AcademicYear;