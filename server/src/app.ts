import express from "express";
import cors from "cors";
import { logger } from "./middlewares/logger";
import { initDB } from "./utils/db";
import "dotenv/config.js";
import usersRoutes from "./routes/usersRoutes"
import chickenRoutes from "./routes/chickensRoutes"

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.use("/users",usersRoutes)
app.use("/chickens",chickenRoutes)

initDB();

export default app;
