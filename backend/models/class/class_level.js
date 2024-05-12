import { INTEGER, STRING } from "sequelize";
import sequelize from "../../util/database.js";

const ClassLevel = sequelize.define("class_level", {
  id: {
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  school_level: {
    type: STRING,
    allowNull: false,
  }
});

export default ClassLevel;