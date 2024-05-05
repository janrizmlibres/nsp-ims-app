import express from "express";

import sequelize from "./util/database.js";
import setAssociations from "./util/associations.js";
import { injectAll } from "./util/db_injector.js";

import adminRoutes from "./routes/admin.js";
import authRoutes from "./routes/auth.js";
import termRoutes from "./routes/term.js";
import classRoutes from "./routes/class.js";
import strandRoutes from "./routes/strand.js";
import utilitiesRoutes from "./routes/utilities.js";
import volunteerRoutes from "./routes/volunteer.js";
import setAssociations from "./util/relations.js";
import bcrypt from "bcryptjs";

import * as dbInjector from "./util/db_injector.js";
import "./util/relations.js";

const app = express();
const port = process.env.PORT || 3000;
setAssociations();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.options("/*", (_, res) => {
  res.sendStatus(200);
});

app.get("/", (_, res) => {
  res.send("Please enter a valid endpoint.");
});

app.use("/admin", adminRoutes);
app.use("/auth", authRoutes);
app.use("/term", termRoutes);
app.use("/class", classRoutes);
app.use("/strand", strandRoutes);
app.use("/utilities", utilitiesRoutes);
app.use("/volunteer", volunteerRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

try {
  await sequelize.sync({ force: true });
  await dbInjector.injectStaff();
  await dbInjector.injectAcademicYear();
  await dbInjector.injectLearningStrand();
  await dbInjector.injectLearner();
  await dbInjector.injectVolunteer();
  app.listen(port);
  console.log("Listening on port " + port);
} catch (error) {
  console.log(error);
}
