import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import config from "./config";
import userRoutes from "./routers/user.request";
import authRoutes from "./routers/auth.route";
import { errorHandler, HttpError } from "./utils/errorHandler";

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const error = errorHandler(err)
  res.status(error.status).json(error);
});

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
