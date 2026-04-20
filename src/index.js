import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import userRoutes from "./routes/userRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import vacancyRoutes from "./routes/vacancyRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import resourcesRoutes from "./routes/resourcesRoutes.js";
import forumRoutes from "./routes/forumRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";

import { env } from "./config/env.js";

import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(helmet());
app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

app.use(limiter);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  message:
    "Demasiadas peticiones desde esta IP, por favor intenta de nuevo después de 15 minutos",
});

app.use("/auth", authLimiter);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hola mundo, el servidor está funcionando correctamente");
});

app.use("/users", userRoutes);
app.use("/companies", companyRoutes);
app.use("/auth", authRoutes);
app.use("/vacancy", vacancyRoutes);
app.use("/", applicationRoutes);
app.use("/admin", adminRoutes);
app.use("/resources", resourcesRoutes);
app.use("/forum/posts", forumRoutes);
app.use("/reviews", reviewRoutes);
app.use("/me", profileRoutes);

app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
  app.listen(env.PORT, () => {
    console.log(`Servidor corriendo en: http://localhost:${env.PORT}`);
  });
}

export default app;
