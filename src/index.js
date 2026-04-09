import express from "express";

import userRoutes from "./routes/userRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import vacancyRoutes from "./routes/vacancyRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

import dotenv from "dotenv";

import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hola mundo, el servidor está funcionando correctamente");
});

app.use("/users", userRoutes);
app.use("/companies", companyRoutes);
app.use("/register", authRoutes);
app.use("/vacancy", vacancyRoutes);
app.use("/", applicationRoutes);
app.use("/admin", adminRoutes);

app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Servidor corriendo en: http://localhost:${process.env.PORT || 3000}`,
  );
});
