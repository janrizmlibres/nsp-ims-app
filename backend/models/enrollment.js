import { INTEGER, STRING, DATE, BOOLEAN, TEXT } from "sequelize";
import sequelize from "../util/database.js";
import Learner from "./learner.js";
import ClassLevel from "./class_level.js";

const Enrollment = sequelize.define('enrollment', {
    learnerId: {
        type: INTEGER,
        references: {
        model: Learner,
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
