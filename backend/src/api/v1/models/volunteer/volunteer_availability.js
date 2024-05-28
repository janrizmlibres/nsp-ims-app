import { INTEGER, STRING } from "sequelize";
import sequelize from "../../../util/database.js";

const VolunteerAvailability = sequelize.define("volunteer_availability", {
  id: {
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  day: {
    type: STRING,
    allowNull: false,
  },
});

export default VolunteerAvailability;
