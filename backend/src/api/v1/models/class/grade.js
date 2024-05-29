import { BOOLEAN, INTEGER, TEXT } from "sequelize";
import sequelize from "../../../../util/database.js";

import { ClassLearningStrand } from "./class_learning_strand.js";
import { Enrollment } from "../enrollment.js";

export const Grade = sequelize.define("grade", {
  id: {
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  enrollmentId: {
    type: INTEGER,
    references: {
      model: Enrollment,
      key: "id",
    },
  },
  classLearningStrandId: {
    type: INTEGER,
    references: {
      model: ClassLearningStrand,
      key: "id",
    },
  },
  first_quarter: {
    type: BOOLEAN,
    defaultValue: false,
  },
  second_quarter: {
    type: BOOLEAN,
    defaultValue: false,
  },
  third_quarter: {
    type: BOOLEAN,
    defaultValue: false,
  },
  fourth_quarter: {
    type: BOOLEAN,
    defaultValue: false,
  },
  remarks: {
    type: TEXT,
    defaultValue: "",
  },
});
