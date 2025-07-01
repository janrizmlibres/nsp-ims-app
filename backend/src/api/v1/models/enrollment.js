import { INTEGER, STRING, DATE, BOOLEAN, TEXT } from "sequelize";
import sequelize from "../../../util/database.js";

import { ClassLevel } from "./class/class_level.js";
import { Student } from "./student/student.js";

export const Enrollment = sequelize.define("enrollment", {
  id: {
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  studentId: {
    type: INTEGER,
    references: {
      model: Student,
      key: "id",
    },
  },
  classLevelId: {
    type: INTEGER,
    references: {
      model: ClassLevel,
      key: "id",
    },
  },
  hasEnrollmentForm: BOOLEAN,
  ftl_pretest: INTEGER,
  dateEnrolled: DATE,
  status: STRING,
  promotionStatus: STRING,
  regularity: STRING,
  remarks: TEXT,
  enrollmentFormURL: STRING,
});
