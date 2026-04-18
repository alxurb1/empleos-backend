import { Router } from "express";

import * as authController from "../controllers/authController.js";

const router = Router();

router.post("/registerCandidate", authController.registerCandidate);
router.post("/registerCompany", authController.registerCompany);
router.post("/loginCandidate", authController.loginCandidate);
router.post("/loginCompany", authController.loginCompany);

router.post("/logout", authController.logout);

export default router;
