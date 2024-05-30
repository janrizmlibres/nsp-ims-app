import path, { dirname } from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";

import swaggerjsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import sequelize from "./util/database.js";
import { injectAll } from "./util/db_injector.js";
import setAssociations from "./util/associations.js";

import "dotenv/config";

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

const router = express.Router();

app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/enrollment", enrollmentRoutes);
app.use("/api/v1/term", termRoutes);
app.use("/api/v1/class", classRoutes);
app.use("/api/v1/classLearningStrand", classLearningStrandRoutes);
app.use("/api/v1/utilities", utilitiesRoutes);
app.use("/api/v1/volunteer", volunteerRoutes);

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "XU-NSP API Docs",
      version: "1.0.0",
    },
    servers: [{ url: "http:localhost:8080/v1" }],
  },
  apis: ["./src/api/v1/routes/*.js"],
};

const specs = swaggerjsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

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
