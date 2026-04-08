import { Router } from "express";

import * as authController from "../controllers/authController.js";

const router = Router();

router.post("/candidate", authController.registerCandidate);
router.post("/company", authController.registerCompany);

export default router;
