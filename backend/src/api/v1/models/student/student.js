import { INTEGER, STRING, BIGINT, VIRTUAL } from "sequelize";
import sequelize from "../../../../util/database.js";

export const Student = sequelize.define("student", {
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  lrn: BIGINT,
  category: {
    type: STRING,
    allowNull: false,
  },
  firstName: {
    type: STRING,
    allowNull: false,
  },
  middleName: STRING,
  suffixName: STRING,
  lastName: {
    type: STRING,
    allowNull: false,
  },
  photoUrl: STRING,
  fullname: {
    type: VIRTUAL,
    get() {
      return (
        this.firstName +
        (this.middleName === null ? " " : ` ${this.middleName} `) +
        this.lastName +
        (this.suffixName === null ? "" : ` ${this.suffixName}`)
      );
    },
    set(_value) {
      throw new Error("Do not try to set the `fullname` value!");
    },
  },
  admitted_year: {
    type: STRING,
    allowNull: false
  },
});
