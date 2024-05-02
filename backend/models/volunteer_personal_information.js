import { INTEGER, DATE, BOOLEAN, STRING } from "sequelize";
import sequelize from "../util/database.js";

const VolunteerPersonalInformation = sequelize.define("voluneer_personal_information", {
    id: {
        type: INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    nickname: {
        type: STRING,
        allowNull: false
    },
    sex: {
        type: STRING,
        allowNull: false
    },
    birthday: {
        type: DATE,
        allowNull: false
    },
    housing: {
        type: STRING,
        allowNull: false
    },
    barangay: {
        type: STRING,
        allowNull: false
    },
    city: {
        type: STRING,
        allowNull: false
    },
    province: {
        type: STRING,
        allowNull: false
    },

    address: {
        type: VIRTUAL,
        get() {
            return (
            this.housing +
            this.barangay +
            this.city +
            this.province
            );
        },
        set(_value) {
            throw new Error("Do not try to set the `address` value!");
        },
    },
});

export default VolunteerPersonalInformation;