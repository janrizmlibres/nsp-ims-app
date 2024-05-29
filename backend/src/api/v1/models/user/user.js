import { INTEGER, DATE, STRING, VIRTUAL } from "sequelize";
import sequelize from "../../../../util/database.js";

export const User = sequelize.define("user", {
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  lastLogin: DATE,
  lastName: {
    type: STRING,
    allowNull: false,
  },
  firstName: {
    type: STRING,
    allowNull: false,
  },
  middleName: STRING,
  suffixName: STRING,
  email: STRING,
  contactNum: {
    type: STRING,
    allowNull: false,
  },
  position: {
    type: STRING,
    allowNull: false,
  },
  hashedPw: {
    type: STRING,
    allowNull: false,
  },
  // Access Levels:
  // 1 - Admin
  // 2 - Sub-Admin
  // 3 - Staff
  accessLevel: {
    type: INTEGER,
    allowNull: false,
  },
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
});
