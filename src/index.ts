import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { artistRoutes } from "./api/routes/artistRoutes";
import { errorHandler } from "./api/middlewares/errorMiddleware";

dotenv.config();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/artist", artistRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  ()=>console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
