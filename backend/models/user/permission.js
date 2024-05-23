import { INTEGER, BOOLEAN } from "sequelize";
import sequelize from "../../util/database.js";

const Permission = sequelize.define("permission", {
  id: {
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  canMgStuds: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  canMgEnrollment: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  canMgVolunteer: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  canMgClass: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  canMgTerm: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  canMgLs: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  canMgStudReq: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  canMgStudCat: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  canMgUser: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

export default Permission;
