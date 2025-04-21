import express, { NextFunction, Response, Request } from "express";
import scheduleRoutes from "./routes/schedule";
import { applySecurity } from "./middlewares/security";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
app.use(express.json());
applySecurity(app);

app.get("/api/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "healthy" });
});

app.use("/api/schedules", scheduleRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Not Found" });
});

app.use(errorHandler);

export default app;
