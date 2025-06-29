import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";



/*const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads"); // ✅ This is important
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${uuidv4()}${ext}`);
  },
});*/



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = file.originalname.split('.').pop();
    cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`);
  },
});

export const upload = multer({
  storage,
});

