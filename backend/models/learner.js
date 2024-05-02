import { INTEGER, STRING, BIGINT } from "sequelize";
import sequelize from "../util/database.js";

const Learner = sequelize.define("learner", {
    id: {
        type: INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    lrn: BIGINT,
    lastName: {
        type: STRING,
        allowNull: false
    },
    firstName: {
        type: STRING,
        allowNull: false
    },
    middleName: STRING,
    suffix: STRING,
    category: {
        type: STRING,
        allowNull: false
    }
});

export default Learner;