import { INTEGER, BOOLEAN } from "sequelize";
import sequelize from "../util/database.js";

const properties = {
  type: BOOLEAN,
  allowNull: false,
  defaultValue: false,
};

const Permission = sequelize.define("permission", {
  id: {
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  can_mg_studs: properties,
  can_mg_enrollment: properties,
  can_mg_volunteer: properties,
  can_mg_class: properties,
  can_mg_term: properties,
  can_mg_ls: properties,
  can_mg_stud_req: properties,
  can_mg_staff: properties,
});

export default Permission;
