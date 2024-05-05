"use strict";
export default (sequelize, DataTypes) => {
  const Audit = sequelize.define("audit", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  Audit.associate = (models) => {
    Audit.belongsTo(models.Staff);
  };

  return Audit;
};
