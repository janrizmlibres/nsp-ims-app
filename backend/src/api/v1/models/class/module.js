import { INTEGER, STRING, DATE, BOOLEAN } from "sequelize";
import sequelize from "../../util/database.js";

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
    distribution_date: {
        type: DATE,
        allowNull: false
    },
    retrieval_date: {
        type: DATE,
        allowNull: false
    },
    status: {
        type: BOOLEAN,
        defaultValue: false
    }
});

export default Module;
