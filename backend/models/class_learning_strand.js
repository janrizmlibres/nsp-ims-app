import { INTEGER, STRING } from "sequelize";
import sequelize from "../util/database.js";
import LearningStrand from "./learning_strand.js";
import ClassLevel from "./class_level.js";

const ClassLearningStrand = sequelize.define('class_learning_strand', {
    classLevelId: {
        type: INTEGER,
        references: {
        model: ClassLevel,
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
