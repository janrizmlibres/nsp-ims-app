import { INTEGER, DATE, BOOLEAN, STRING } from "sequelize";
import sequelize from "../util/database.js";

const Student = sequelize.define("student", {
    id: {
        type: INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    digital_literacy: INTEGER,
    ftl_pretest: INTEGER,
    callable: BOOLEAN,
    bridger: BOOLEAN
});

export default Student;