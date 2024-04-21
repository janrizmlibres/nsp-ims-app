import express from "express";
import sequelize from "./util/database.js";
import adminRoutes from "./routes/admin.js";
import bcrypt from "bcryptjs";

import Staff from "./models/staff.js";

const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Please enter a valid endpoint.");
});

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

try {
  await sequelize.sync({ force: true });

  const janpass = await bcrypt.hash("janrizpass", 12);
  await Staff.create({
    last_name: "Libres",
    first_name: "Janriz",
    username: "janrizlibs",
    hashed_pw: janpass,
  });

  const joypass = await bcrypt.hash("joypass", 12);
  await Staff.create({
    last_name: "Etom",
    first_name: "Joy",
    username: "joyetom",
    hashed_pw: joypass,
  });

  app.listen(port);
  console.log("Listening on port " + port);
} catch (error) {
  console.log(error);
}
