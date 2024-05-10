import { INTEGER, STRING } from "sequelize";
import sequelize from "../../util/database.js";

const EmergencyPerson = sequelize.define("emergency_person", {
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  lastName: {
    type: STRING,
    allowNull: false,
  },
  middleName: STRING,
  lastName: {
    type: STRING,
    allowNull: false,
  },
  suffixName: STRING,
  contactNum: {
    type: STRING,
    allowNull: false,
  },
  relationship: {
    type: STRING,
    allowNull: false,
  },
});

export default EmergencyPerson;
