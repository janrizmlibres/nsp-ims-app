import express from "express";

import sequelize from "./util/database.js";
import adminRoutes from "./routes/admin.js";
import authRoutes from "./routes/auth.js";
import * as dbInjector from "./util/db_injector.js";

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

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Please enter a valid endpoint.");
});

app.use("/admin", adminRoutes);
app.use("/auth", authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

app.options("*", (req, res) => {
  // Pre-flight request. Reply successfully:
  res.status(200).send();
});

try {
  await sequelize.sync({ force: true });
  await dbInjector.injectStaff();
  app.listen(port);
  console.log("Listening on port " + port);
} catch (error) {
  console.log(error);
}
