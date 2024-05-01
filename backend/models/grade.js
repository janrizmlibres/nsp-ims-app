import { INTEGER, STRING, DATE } from "sequelize";
import sequelize from "../util/database.js";
import Student from "./nsp_student.js";
import ClassLearningStrand from "./class_learning_strand.js";

const Grade = sequelize.define("grade", {
  studentId: {
      type: INTEGER,
      references: {
      model: Student,
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
  first_quarter: STRING,
  second_quarter: STRING,
  third_quarter: STRING,
  fourth_quarter: STRING,
  remarks: STRING,
});

export default Grade;
