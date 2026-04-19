import express from "express";
import cors from "cors";

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

import dotenv from "dotenv";

import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();
app.use(cors());

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

app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Servidor corriendo en: http://localhost:${process.env.PORT || 3000}`,
  );
});
