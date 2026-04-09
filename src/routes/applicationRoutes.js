import * as applicationController from "../controllers/applicationController.js";

import { Router } from "express";

const router = Router();

router.get("/me/:id/applications", applicationController.getApplicationsByUser);

router.get(
  "/companies/:id/applications",
  applicationController.getApplicationsByCompany,
);

router.post("/vacancy/:id/apply", applicationController.applyToVacancy);

router.put(
  "/applications/:id/status",
  applicationController.updateApplicationStatus,
);

export default router;
