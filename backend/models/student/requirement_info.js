import { BOOLEAN, STRING, INTEGER } from "sequelize";
import sequelize from "../../util/database.js";

const RequirementInfo = sequelize.define("requirement_info", {
  id: {
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  met: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

export default RequirementInfo;
