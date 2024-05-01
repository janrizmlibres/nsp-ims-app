import { INTEGER, STRING, DATE, BOOLEAN, TEXT } from "sequelize";
import sequelize from "../util/database.js";
import Student from "./nsp_student.js";
import ClassLevel from "./class_level.js";

const Enrollment = sequelize.define('enrollment', {
    nsp_studentId: {
        type: INTEGER,
        references: {
        model: Student,
        key: 'id',
        },
    },
    class_levelId: {
        type: INTEGER,
        references: {
        model: ClassLevel,
        key: 'id',
        },
    },
    hasEnrollmentForm: BOOLEAN,
    dateEnrolled: DATE,
    status: STRING,
    modularity: STRING,
    remarks: TEXT
});

export default Enrollment;
