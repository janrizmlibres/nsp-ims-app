import { INTEGER, STRING, DATE, TEXT } from "sequelize";
import sequelize from "../util/database.js";
import Student from "./nsp_student.js";
import Session from "./session.js";

const Attendance = sequelize.define("attendance", {
  studentId: {
      type: INTEGER,
      references: {
      model: Student,
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
  date: {
    type: DATE,
    allowNull: false,
  },
  status: STRING,
  remarks: TEXT,
});

export default Attendance;
