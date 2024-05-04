import { INTEGER, STRING, DATE } from "sequelize";
import sequelize from "../util/database.js";
import Module from "./module.js";
import Learner from "./learner.js";

const ModuleSubmission = sequelize.define("module_submission", {
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
  title: {
    type: STRING,
    allowNull: false,
  },
  distribution_date: DATE,
  retrieval_date: DATE,
});

export default ModuleSubmission;
