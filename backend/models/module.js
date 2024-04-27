import { INTEGER, STRING, DATE } from "sequelize";
import sequelize from "../util/database.js";
import Class from "./class.js";
import LearningStrand from "./learning_strand.js";

const Module = sequelize.define('module', {
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
    title: {
        type: STRING,
        allowNull: false
    },
    distribution_date: DATE,
    retrieval_date: DATE
});

export default Module;
