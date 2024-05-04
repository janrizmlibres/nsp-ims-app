import { INTEGER, STRING, DATE } from "sequelize";
import sequelize from "../util/database.js";

const Module = sequelize.define('module', {
    id: {
        type: INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: STRING,
        allowNull: false
    },
    distribution_date: DATE,
    retrieval_date: DATE
});

export default Module;
