import multer from "multer";
import { v4 as uuidv4 } from "uuid";

export const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    file.mimetype === "application/pdf"
      ? cb(null, "static/documents/pdfs")
      : cb(null, "static/images");
  },
  filename: (req, file, cb) => cb(null, uuidv4() + "-" + file.originalname),
});

export const imageFilter = (req, file, cb) => {
  if (["image/png", "image/jpg", "image/jpeg"].includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const enrollmentFormFilter = (req, file, cb) => {
  if (["application/pdf"].includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
