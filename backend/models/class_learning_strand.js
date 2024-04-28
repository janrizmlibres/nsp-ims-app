import { INTEGER, STRING, TIME } from "sequelize";
import sequelize from "../util/database.js";
import LearningStrand from "./learning_strand.js";
import Class from "./class.js";

const ClassLearningStrand = sequelize.define('class_learning_strand', {
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
    teacher: STRING
});

export default ClassLearningStrand;
