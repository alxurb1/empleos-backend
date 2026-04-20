import * as vacancyController from "../controllers/vacancyController.js";

import { Router } from "express";

import { createVacancyValidators, runValidations } from "../middlewares/vacancyValidators.js";
const router = Router();

router.post("/", runValidations(createVacancyValidators), vacancyController.createVacancy);
router.get("/", vacancyController.getVacancies);
router.get("/:id", vacancyController.getVacancyById);
router.get("/company/:id", vacancyController.getVacanciesByCompany);


router.put("/:id", vacancyController.updateVacancy);
router.put("/:id/status", vacancyController.updateVacancyStatus);

export default router;
