export default (sequelize, DataTypes) => {
  const Staff = sequelize.define("staff", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    lastLogin: DataTypes.DATE,
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    middleName: DataTypes.STRING,
    suffixName: DataTypes.STRING,
    email: DataTypes.STRING,
    contactNum: DataTypes.STRING,
    position: DataTypes.STRING,
    hashedPw: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Access Levels:
    // 1 - Admin
    // 2 - Sub-Admin
    // 3 - Staff
    accessLevel: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 3,
    },
    fullname: {
      type: DataTypes.VIRTUAL,
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

  Staff.associate = (models) => {
    Staff.hasOne(models.Permission);
    Staff.hasOne(models.Audit);
  };

  return Staff;
};
