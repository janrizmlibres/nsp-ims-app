import { INTEGER, STRING } from "sequelize";
import sequelize from "../../../../util/database.js";

export const VolunteerContactInformation = sequelize.define(
  "volunteer_contact_information",
  {
    id: {
      type: INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    email: STRING,
    contactNumber: {
      type: STRING,
      allowNull: false,
    },
    facebook: STRING,
  }
);
