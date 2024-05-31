import { INTEGER, STRING } from "sequelize";
import sequelize from "../../../util/database.js";

export const StudentCategory = sequelize.define("student_category", {
  id: {
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  category_name: {
    type: STRING,
    allowNull: false,
  },
});
