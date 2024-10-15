import { Router } from "express";
import * as chickensControllers from "../controllers/chickensControllers";
import { upload } from "../middlewares/multer";

const router = Router();

router.get("/:user_id", chickensControllers.getChickensByUserID);

router.post(
	"/create/:user_id",
	upload.single("chicken_image"),
	chickensControllers.create,
);

router.put(
	"/update/:id",
	upload.single("chicken_image"),
	chickensControllers.update,
);

router.delete("/delete/:id", chickensControllers.deleteChicken);

export default router;
