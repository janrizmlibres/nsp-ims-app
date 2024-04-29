import { INTEGER, STRING, DATE } from "sequelize";
import sequelize from "../util/database.js";

const LearningStrand = sequelize.define("learning-strand", {
  id: {
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  code: {
    type: STRING,
    allowNull: false,
  },
  name: {
    type: STRING,
    allowNull: false,
  }
});

export default LearningStrand;