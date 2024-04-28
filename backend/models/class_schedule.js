import { INTEGER, STRING, TIME } from "sequelize";
import sequelize from "../util/database.js";
import ClassLearningStrand from "./class_learning_strand.js";

const ClassSchedule = sequelize.define('class_schedule', {
    id: {
        type: INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    classLearningStrandId: {
        type: INTEGER,
        references: {
        model: ClassLearningStrand,
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
});

export default ClassSchedule;
