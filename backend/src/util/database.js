import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DATABASE_DB,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: "mariadb",
    logging: false,
  }
);

export default sequelize;
