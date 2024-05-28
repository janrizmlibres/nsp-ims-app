import { INTEGER, STRING } from "sequelize";
import sequelize from "../../../util/database.js";

const ProfessionalVolunteer = sequelize.define("professional_volunteer", {
  id: {
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  work: {
    type: STRING,
    allowNull: false,
  },
});

export default ProfessionalVolunteer;
