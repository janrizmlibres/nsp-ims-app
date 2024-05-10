import { INTEGER, STRING } from "sequelize";
import sequelize from "../../util/database.js";

const ParentalInfo = sequelize.define("parental_info", {
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  fatherLastName: STRING,
  fatherMiddleName: STRING,
  fatherFirstName: STRING,
  fatherSuffixName: STRING,
  fatherOccupation: STRING,
  motherLastName: STRING,
  motherMiddleName: STRING,
  motherFirstName: STRING,
  motherSuffixName: STRING,
  motherOccupation: STRING,
});

export default ParentalInfo;
