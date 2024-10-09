import { Router } from "express";
import * as chickensControllers from "../controllers/chickensControllers";
import { upload } from "../middlewares/multer";

const router = (Router())

router.post("/create/:id", upload.single("chicken_image"), chickensControllers.create)


export default router