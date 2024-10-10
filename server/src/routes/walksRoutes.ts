import { Router } from "express";
import * as walksControllers from "../controllers/walksControllers";

const router = Router();

router.post("/create", walksControllers.create);

export default router;
