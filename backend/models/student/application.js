import { BOOLEAN, INTEGER, STRING } from "sequelize";
import sequelize from "../../util/database.js";

const Application = sequelize.define("application", {
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  photo: {
    type: STRING,
    allowNull: false,
  },
  signatureSpecimen: {
    type: STRING,
    allowNull: false,
  },
  hasEndorsementLetter: {
    type: BOOLEAN,
    allowNull: false,
  },
  hasBirthCertificate: {
    type: BOOLEAN,
    allowNull: false,
  },
  hasBarangayClearance: {
    type: BOOLEAN,
    allowNull: false,
  },
  hasResidencyCertificate: {
    type: BOOLEAN,
    allowNull: false,
  },
  waiverForPhotos: {
    type: STRING,
    allowNull: false,
  },
  healthRecords: {
    type: STRING,
    allowNull: false,
  },
});

export default Application;
