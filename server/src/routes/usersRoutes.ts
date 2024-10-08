import { Router } from "express";
import * as usersControllers from "../controllers/usersControllers";
import { upload } from "../middlewares/multer";

const router = (Router())

router.post("/register", upload.single("image"), usersControllers.register)

router.post("/login", usersControllers.login)

export default router