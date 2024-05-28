import { INTEGER, STRING, TIME } from "sequelize";
import sequelize from "../../util/database.js";

const ClassSchedule = sequelize.define('class_schedule', {
    id: {
        type: INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    days: {
        type: STRING,
        allowNull: false
    },
    start_time: {
        type: TIME,
        allowNull: false
    },
    end_time: {
        type: TIME,
        allowNull: false
    },
});

export default ClassSchedule;
