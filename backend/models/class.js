import { INTEGER, STRING, DATE } from "sequelize";
import sequelize from "../util/database.js";

const Class = sequelize.define("class", {
  id: {
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  school_level: {
    type: STRING,
    allowNull: false,
    unique: true
  }
});

export default Class;
