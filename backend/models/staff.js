import { INTEGER, STRING, DATE, VIRTUAL } from "sequelize";
import sequelize from "../util/database.js";

const Staff = sequelize.define("staff", {
  id: {
    type: INTEGER,
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
  email: STRING,
  contact_num: STRING,
  position: STRING,
  hashed_pw: {
    type: STRING,
    allowNull: false,
  },
  fullname: {
    type: VIRTUAL,
    get() {
      return (
        this.first_name +
        (this.middle_name === null ? " " : ` ${this.middle_name} `) +
        this.last_name
      );
    },
    set(_value) {
      throw new Error("Do not try to set the `fullname` value!");
    },
  },
});

export default Staff;
