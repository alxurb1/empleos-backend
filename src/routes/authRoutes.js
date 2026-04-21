import { Router } from "express";

import * as authController from "../controllers/authController.js";
import { validate } from "../middlewares/validate.js";
import {
  registerCandidateSchema,
  registerCompanySchema,
  loginSchema,
} from "../validators/authValidator.js";

const router = Router();

router.post(
  "/registerCandidate",
  validate(registerCandidateSchema),
  authController.registerCandidate,
);
router.post(
  "/registerCompany",
  validate(registerCompanySchema),
  authController.registerCompany,
);
router.post(
  "/loginCandidate",
  validate(loginSchema),
  authController.loginCandidate,
);
router.post(
  "/loginCompany",
  validate(loginSchema),
  authController.loginCompany,
);
router.post("/loginAdmin", validate(loginSchema), authController.loginAdmin);

router.post("/logout", authController.logout);

export default router;
