import * as vacancyController from "../controllers/vacancyController.js";

import { Router } from "express";

const router = Router();

router.get("/", vacancyController.getVacancies);
router.get("/:id", vacancyController.getVacancyById);
router.get("/company/:id", vacancyController.getVacanciesByCompany);

router.post("/", vacancyController.createVacancy);

router.put("/:id", vacancyController.updateVacancy);
router.put("/:id/status", vacancyController.updateVacancyStatus);

export default router;
