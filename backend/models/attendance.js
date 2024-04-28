import { INTEGER, STRING, DATE, TEXT } from "sequelize";
import sequelize from "../util/database.js";
import ClassSchedule from "./class_schedule.js";

const Attendance = sequelize.define('attendance', {
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
        key: 'id',
        },
    },
    classScheduleId: {
        type: INTEGER,
        references: {
        model: ClassSchedule,
        key: 'id',
        },
    },
    date: {
        type: DATE,
        allowNull: false
    },
    status: STRING,
    remarks: TEXT
});

export default Attendance;
