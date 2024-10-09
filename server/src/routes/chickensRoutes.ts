import { Router } from "express";
import * as chickensControllers from "../controllers/chickensControllers";
import { upload } from "../middlewares/multer";

const router = (Router())

router.get("/:id",chickensControllers.getChickensByUserID)

router.post("/create/:user_id", upload.single("chicken_image"), chickensControllers.create)


export default router