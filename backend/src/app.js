import path, { dirname } from "path";
import { fileURLToPath } from "url";
import express from "express";

import sequelize from "./util/database.js";
import { injectAll } from "./util/db_injector.js";
import setAssociations from "./util/associations.js";

import {
  adminRoutes,
  authRoutes,
  enrollmentRoutes,
  termRoutes,
  classRoutes,
  classLearningStrandRoutes,
  utilitiesRoutes,
  volunteerRoutes,
  profileRoutes,
} from "./api/v1/routes/index.js";

import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;
setAssociations();

app.use(express.json());

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(
  "/enrollmentForms",
  cors(),
  express.static(path.join(__dirname, "enrollmentForms"))
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.options("/*", (_, res) => {
  res.sendStatus(200);
});

app.get("/", (_, res) => {
  res.send("Please enter a valid endpoint.");
});

app.use("/profile", profileRoutes);
app.use("/admin", adminRoutes);
app.use("/auth", authRoutes);
app.use("/enrollment", enrollmentRoutes);
app.use("/term", termRoutes);
app.use("/class", classRoutes);
app.use("/classLearningStrand", classLearningStrandRoutes);
app.use("/utilities", utilitiesRoutes);
app.use("/volunteer", volunteerRoutes);

app.use((error, _req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

try {
  await sequelize.sync({ force: true });
  await injectAll();
  app.listen(port);
  console.log("Listening on port " + port);
} catch (error) {
  console.log(error);
}
