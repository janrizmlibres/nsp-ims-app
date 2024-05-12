import { INTEGER, STRING, DATE, BOOLEAN, TEXT } from "sequelize";
import sequelize from "../util/database.js";
import Student from "./student/student.js";
import ClassLevel from "./class_level.js";

const Enrollment = sequelize.define('enrollment', {
    studentId: {
        type: INTEGER,
        references: {
        model: Student,
        key: 'id',
        },
    },
    classLevelId: {
        type: INTEGER,
        references: {
        model: ClassLevel,
        key: 'id',
        },
    },
    hasEnrollmentForm: BOOLEAN,
    digital_literacy: INTEGER,
    ftl_pretest: INTEGER,
    callable: BOOLEAN,
    bridger: BOOLEAN,
    dateEnrolled: DATE,
    status: STRING,
    modularity: STRING,
    remarks: TEXT
});

export default Enrollment;
