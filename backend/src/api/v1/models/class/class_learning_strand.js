import { INTEGER } from "sequelize";
import sequelize from "../../../../util/database.js";

import { ClassLevel } from "./index.js";
import { LearningStrand } from "../index.js";

export const ClassLearningStrand = sequelize.define("class_learning_strand", {
  id: {
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  classLevelId: {
    type: INTEGER,
    references: {
      model: ClassLevel,
      key: "id",
    },
  },
  learningStrandId: {
    type: INTEGER,
    references: {
      model: LearningStrand,
      key: "id",
    },
  },
});
