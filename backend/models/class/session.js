import { INTEGER, DATE } from "sequelize";
import sequelize from "../../util/database.js";

const Session = sequelize.define("session", {
    id: {
        type: INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    date: {
        type: DATE,
        allowNull: false,
    }
});

export default Session;
