import express from "express";
import sequelize from "./util/database.js";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

try {
  await sequelize.sync({ force: true });
  app.listen(port);
} catch (error) {
  (error) => console.log(error);
}
