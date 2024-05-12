import { BOOLEAN, INTEGER, STRING } from "sequelize";
import sequelize from "../util/database.js";
import ClassLearningStrand from "./class_learning_strand.js";
import Learner from "./learner.js";

const Grade = sequelize.define("grade", {
  id: {
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  studentId: {
      type: INTEGER,
      references: {
      model: Learner,
      key: 'id',
      },
  },
  classLearningStrandId: {
    type: INTEGER,
    references: {
      model: ClassLearningStrand,
      key: "id",
    },
  },
  first_quarter: BOOLEAN,
  second_quarter: BOOLEAN,
  third_quarter: BOOLEAN,
  fourth_quarter: BOOLEAN,
  remarks: STRING,
});

export default Grade;
