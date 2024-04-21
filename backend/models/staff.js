import { INTEGER, STRING, DATE } from "sequelize";
import sequelize from "../util/database.js";

const Staff = sequelize.define("staff", {
  id: {
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  last_login: DATE,
  last_name: {
    type: STRING,
    allowNull: false,
  },
  first_name: {
    type: STRING,
    allowNull: false,
  },
  middle_name: STRING,
  suffix_name: STRING,
  username: {
    type: STRING,
    allowNull: false,
  },
  hashed_pw: {
    type: STRING,
    allowNull: false,
  },
});

export default Staff;
