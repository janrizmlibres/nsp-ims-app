import { INTEGER, STRING } from "sequelize";
import sequelize from "../../util/database.js";

const VolunteerContactInformation = sequelize.define(
  "voluneer_contact_information",
  {
    id: {
      type: INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    email: STRING,
    contactNumber: {
      type: INTEGER,
      allowNull: false,
    },
    facebook: STRING,
  }
);

export default VolunteerContactInformation;
