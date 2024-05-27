import { INTEGER, DATE, BOOLEAN, STRING } from "sequelize";
import sequelize from "../util/database.js";

const Term = sequelize.define("term", {
  id: {
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  academic_year: {
    type: STRING,
    allowNull: false
  },
  start_date: {
    type: DATE,
    allowNull: false
  },
  end_date: {
    type: DATE,
    allowNull: false
  },
  status: {
    type: BOOLEAN,
    allowNull: false
  }
});

export default Term;