import multer from "multer";
import path from "node:path";

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, "../../public/images/"));
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname));
	},
});

export const upload = multer({ storage });
