import { INTEGER, STRING } from "sequelize";
import sequelize from "../../../../util/database.js";

import { ClassLevel } from "./index.js";

export const ClassLearningStrand = sequelize.define("class_learning_strand", {
  id: {
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  code: {
    type: STRING,
    allowNull: false,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
  classLevelId: {
    type: INTEGER,
    references: {
      model: ClassLevel,
      key: "id",
    },
  }
});
