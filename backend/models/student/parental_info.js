import { INTEGER, STRING } from "sequelize";
import sequelize from "../../util/database.js";

const ParentalInfo = sequelize.define("parental_info", {
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  LastNameF: STRING,
  MiddleNameF: STRING,
  FirstNameF: STRING,
  SuffixNameF: STRING,
  OccupationF: STRING,
  LastNameM: STRING,
  MiddleNameM: STRING,
  FirstNameM: STRING,
  SuffixNameM: STRING,
  OccupationM: STRING,
});

export default ParentalInfo;
