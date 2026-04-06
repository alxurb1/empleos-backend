import express from "express";

import userRoutes from "./routes/userRoutes.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hola mundo, el servidor está funcionando correctamente");
});

app.use("/users", userRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Servidor corriendo en: http://localhost:${process.env.PORT || 3000}`,
  );
});
