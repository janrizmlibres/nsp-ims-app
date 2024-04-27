import { INTEGER, STRING, DATE } from "sequelize";
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

AcademicYear.hasMany(Class, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
})
export default AcademicYear;