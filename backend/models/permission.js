import { INTEGER, BOOLEAN } from "sequelize";
import sequelize from "../util/database.js";

const Permission = sequelize.define("permission", {
  id: {
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  can_add_studs: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  can_enroll_studs: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  can_update_stud_info: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  can_grade_studs: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  can_check_attendance: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

export default Permission;
