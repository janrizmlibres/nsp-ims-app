import { INTEGER, STRING, VIRTUAL } from "sequelize";
import sequelize from "../util/database.js";

const VolunteerEmergency = sequelize.define("volunteer_emergency_contact", {
    id: {
        type: INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
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
    contactNumber: {
        type: STRING,
        allowNull: false
    },
    relationship: {
        type: STRING,
        allowNull: false
    },

    fullname: {
        type: VIRTUAL,
        get() {
            return (
            this.firstName +
            (this.middleName === null ? " " : ` ${this.middleName} `) +
            this.lastName
            );
        },
        set(_value) {
            throw new Error("Do not try to set the `fullname` value!");
        },
    },
});

export default VolunteerEmergency;