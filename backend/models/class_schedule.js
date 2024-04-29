import { INTEGER, STRING, TIME } from "sequelize";
import sequelize from "../util/database.js";
import LearningStrand from "./learning_strand.js";
import Class from "./class.js";

const ClassSchedule = sequelize.define('class_schedule', {
    id: {
        type: INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    classId: {
        type: INTEGER,
        references: {
        model: Class,
        key: 'id',
        },
    },
    learningStrandId: {
        type: INTEGER,
        references: {
        model: LearningStrand,
        key: 'id',
        },
    },
    day: {
        type: STRING,
        allowNull: false
    },
    time: {
        type: TIME,
        allowNull: false
    },
    teacher: STRING
});

export default ClassSchedule;
