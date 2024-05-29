import { INTEGER, STRING } from "sequelize";
import sequelize from "../../../../util/database.js";

export const ContactInfo = sequelize.define("contact_info", {
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  email: STRING,
  contactNum: {
    type: STRING,
    allowNull: false,
  },
  facebook: STRING,
});
