import { INTEGER, STRING } from "sequelize";
import sequelize from "../../util/database.js";

const ParentalInfo = sequelize.define("parental_info", {
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  lastNameF: STRING,
  middleNameF: STRING,
  firstNameF: STRING,
  suffixNameF: STRING,
  occupationF: STRING,
  lastNameM: STRING,
  middleNameM: STRING,
  firstNameM: STRING,
  suffixNameM: STRING,
  occupationM: STRING,
});

export default ParentalInfo;
