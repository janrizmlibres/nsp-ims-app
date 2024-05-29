import { INTEGER, STRING, DATE, TEXT } from "sequelize";
import sequelize from "../../../../util/database.js";

import { Session } from "./index.js";
import { Enrollment } from "../index.js";

export const Attendance = sequelize.define("attendance", {
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
  sessionId: {
    type: INTEGER,
    references: {
      model: Session,
      key: "id",
    },
  },
  status: {
    type: STRING,
    defaultValue: "Absent",
  },
  remarks: {
    type: TEXT,
    defaultValue: "",
  },
});
