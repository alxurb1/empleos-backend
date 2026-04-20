import { Router } from "express";
import * as profileController from "../controllers/profileController.js";
import { uploadCV } from "../middlewares/upload.js";

import { updateProfileValidators, experienceValidators, runValidations } from '../middlewares/profileValidators.js';

const router = Router();


router.get("/:id_user/profile", profileController.getProfile);
router.put("/:id_user/profile", runValidations(updateProfileValidators), profileController.putProfile);

router.get("/:id_user/experience", profileController.getExperience);

router.post("/:id_user/experience", runValidations(experienceValidators), profileController.postExperience);

router.put("/experience/:id_experience", profileController.putExperience);
router.delete("/experience/:id_experience", profileController.deleteExperience);

router.get("/:id_user/cv", profileController.getCV);
router.post("/:id_user/cv", uploadCV.single("cv"), profileController.postCV);
router.delete("/cv/:id_cv", profileController.deleteCV);

router.get("/:id_user/skills", profileController.getSkills);
router.post("/:id_user/skills", profileController.postSkill);
router.delete("/skills/:id_skill", profileController.deleteSkill);

router.get("/:id_user/alerts", profileController.getAlerts);
router.post("/:user_id/alerts", profileController.postAlert);
router.put("/alerts/:id_alert", profileController.putAlert);
router.delete("/alerts/:id_alert", profileController.deleteAlert);

export default router;