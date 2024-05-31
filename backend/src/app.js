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
const router = express.Router();
const port = process.env.PORT || 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));
setAssociations();

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

app.use(express.json());

app.use("/static/images", express.static(path.join(__dirname, "images")));
app.use("static/documents/pdfs", express.static(path.join(__dirname, "pdfs")));

app.use(cors());

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, PATCH, DELETE, OPTIONS"
//   );
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   next();
// });

app.options("/*", (_, res) => {
  res.sendStatus(200);
});

app.get("/", (_, res) => {
  res.send("Please enter a valid endpoint.");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/api/v1", router);

router.use("/profile", profileRoutes);
router.use("/admin", adminRoutes);
router.use("/auth", authRoutes);
router.use("/enrollment", enrollmentRoutes);
router.use("/term", termRoutes);
router.use("/class", classRoutes);
router.use("/classLearningStrand", classLearningStrandRoutes);
router.use("/utilities", utilitiesRoutes);
router.use("/volunteer", volunteerRoutes);

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
