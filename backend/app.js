import path, { dirname } from "path";
import { fileURLToPath } from "url";
import express from "express";

import sequelize from "./util/database.js";
import { injectAll } from "./util/db_injector.js";
import setAssociations from "./util/associations.js";

import adminRoutes from "./routes/admin.js";
import authRoutes from "./routes/auth.js";
import enrollmentRoutes from "./routes/enrollment.js";
import termRoutes from "./routes/term.js";
import classRoutes from "./routes/class.js";
import classLearningStrandRoutes from "./routes/class_learning_strand.js";
import utilitiesRoutes from "./routes/utilities.js";
import volunteerRoutes from "./routes/volunteer.js";
import profileRoutes from "./routes/profile.js";

const app = express();
const port = process.env.PORT || 3000;
setAssociations();

app.use(express.json());

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/enrollmentForms", express.static(path.join(__dirname, "enrollmentForms")));


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
