import { INTEGER, STRING, BIGINT } from "sequelize";
import sequelize from "../../util/database.js";

const Student = sequelize.define("student", {
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  lrn: BIGINT,
  category: {
    type: STRING,
    allowNull: false,
  },
  firstName: {
    type: STRING,
    allowNull: false,
  },
  middleName: STRING,
  lastName: {
    type: STRING,
    allowNull: false,
  },
});

export default Student;
