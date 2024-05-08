import { INTEGER, STRING, DATE, TEXT } from "sequelize";
import sequelize from "../util/database.js";
import Learner from "./learner.js";
import Session from "./session.js";

const Attendance = sequelize.define("attendance", {
  learnerId: {
      type: INTEGER,
      references: {
      model: Learner,
      key: 'id',
      },
  },
  sessionId: {
    type: INTEGER,
    references: {
      model: Session,
      key: "id",
    },
  },
  status: {
    type: STRING,
    defaultValue: 'Absent'
  },
  remarks: TEXT,
});

export default Attendance;
