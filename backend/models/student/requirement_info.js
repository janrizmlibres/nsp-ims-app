import { BOOLEAN, STRING } from "sequelize";
import sequelize from "../../util/database.js";

const RequirementInfo = sequelize.define("requirement_info", {
  name: {
    type: STRING,
    allowNull: false,
  },
  met: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

export default RequirementInfo;
