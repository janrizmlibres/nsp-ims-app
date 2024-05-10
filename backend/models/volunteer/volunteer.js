import { INTEGER, STRING, VIRTUAL } from "sequelize";
import sequelize from "../../util/database.js";

const Volunteer = sequelize.define("volunteer", {
  id: {
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  volunteerId: {
    type: INTEGER,
    allowNull: false,
  },
  affiliation: {
    type: STRING,
    allowNull: false,
  },
  lastName: {
    type: STRING,
    allowNull: false,
  },
  firstName: {
    type: STRING,
    allowNull: false,
  },
  middleName: STRING,
  suffix: STRING,

  fullname: {
    type: VIRTUAL,
    get() {
      return (
        this.firstName +
        (this.middleName === null ? " " : ` ${this.middleName} `) +
        this.lastName
      );
    },
    set(_value) {
      throw new Error("Do not try to set the `fullname` value!");
    },
  },
});

export default Volunteer;
