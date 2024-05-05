import { INTEGER, STRING, DATE } from "sequelize";
import sequelize from "../util/database.js";
import Module from "./module.js";
import Learner from "./learner.js";

const ModuleSubmission = sequelize.define("module_submission", {
  id: {
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  learnerId: {
      type: INTEGER,
      references: {
      model: Learner,
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
  remarks: STRING,
  status: {
    type: STRING,
    defaultValue: 'No Submission'
  }
});

export default ModuleSubmission;
