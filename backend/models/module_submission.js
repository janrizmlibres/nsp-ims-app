import { INTEGER, STRING, DATE } from "sequelize";
import sequelize from "../util/database.js";
import Module from "./module.js";

const ModuleSubmission = sequelize.define("module_submission", {
  id: {
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  // studentId: {
  //     type: INTEGER,
  //     references: {
  //     model: Student,
  //     key: 'id',
  //     },
  // },
  moduleId: {
    type: INTEGER,
    references: {
      model: Module,
      key: "id",
    },
  },
  title: {
    type: STRING,
    allowNull: false,
  },
  distribution_date: DATE,
  retrieval_date: DATE,
});

export default ModuleSubmission;
