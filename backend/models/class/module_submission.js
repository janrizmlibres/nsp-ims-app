import { INTEGER, STRING, DATE } from "sequelize";
import sequelize from "../../util/database.js";
import Module from "./module.js";
import Enrollment from "../enrollment.js";

const ModuleSubmission = sequelize.define("module_submission", {
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
      key: 'id',
      },
  },
  moduleId: {
    type: INTEGER,
    references: {
      model: Module,
      key: "id",
    },
  },
  date_submitted: DATE,
  score: {
    type: INTEGER,
    defaultValue: 0
  },
  remarks: STRING,
  status: {
    type: STRING,
    defaultValue: 'No Submission'
  }
});

export default ModuleSubmission;
