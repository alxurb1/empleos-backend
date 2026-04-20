import * as vacancyController from "../controllers/vacancyController.js";
import { Router } from "express";
import { createVacancyValidators, runValidations } from "../middlewares/vacancyValidators.js";

const router = Router();

// 1. PRIMERO LAS RUTAS ESTÁTICAS Y ESPECÍFICAS
router.get("/search", vacancyController.searchVacancies); // <-- ¡Movimos la búsqueda aquí arriba!
router.get("/", vacancyController.getVacancies);
router.post("/", runValidations(createVacancyValidators), vacancyController.createVacancy);
router.get("/company/:id", vacancyController.getVacanciesByCompany);

// 2. DESPUÉS LAS RUTAS CON PARÁMETROS DINÁMICOS (comodines)
router.get("/:id", vacancyController.getVacancyById);
router.put("/:id", vacancyController.updateVacancy);
router.put("/:id/status", vacancyController.updateVacancyStatus);

export default router;