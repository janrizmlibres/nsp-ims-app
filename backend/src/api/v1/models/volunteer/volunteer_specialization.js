import { INTEGER, STRING } from "sequelize";
import sequelize from "../../../../util/database.js";

export const VolunteerSpecialization = sequelize.define(
  "volunteer_specialization",
  {
    id: {
      type: INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    area: {
      type: STRING,
      allowNull: false,
    },
  }
);
