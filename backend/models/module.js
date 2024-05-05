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
        allowNull: false,
        unique: true
    },
    distribution_date: {
        type: DATE,
        allowNull: false
    },
    retrieval_date: {
        type: DATE,
        allowNull: false
    }
});

export default Module;
