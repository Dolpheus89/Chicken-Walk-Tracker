import { Router } from "express";
import * as usersControllers from "../controllers/usersControllers";
import { upload } from "../middlewares/multer";

const router = Router();

router.post(
	"/register",
	upload.single("profile_image"),
	usersControllers.register,
);
router.post("/login", usersControllers.login);
router.post("/logout", usersControllers.logout);

router.put(
	"/update/:id",
	upload.single("profile_image"),
	usersControllers.updateProfileImg,
);

export default router;
