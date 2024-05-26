import { INTEGER, STRING, JSON } from "sequelize";
import sequelize from "../../util/database.js";

const RequirementInfo = sequelize.define("requirement_info", {
  requirements: {
    type: JSON,
    allowNull: false,
    defaultValue: [],
    validate: {
      isArrayOfObjects(value) {
        if (!Array.isArray(value)) {
          throw new Error('requirements must be an array');
        }

        for (const item of value) {
          if (typeof item !== 'object' || item === null || Array.isArray(item)) {
            throw new Error('Each item in requirements must be an object');
          }

          if (typeof item.name !== 'string') {
            throw new Error('Each item in requirements must have a string property named name');
          }

          if (typeof item.met !== 'boolean') {
            throw new Error('Each item in requirements must have a boolean property named met');
          }
        }
      },
    },
  },
});

export default RequirementInfo;
