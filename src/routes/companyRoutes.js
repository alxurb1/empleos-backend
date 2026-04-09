import { Router } from "express";

import * as companyController from "../controllers/companyController.js";
import { upload } from "../middlewares/upload.js";

const router = Router();

router.get("/", companyController.getCompanies);
router.get("/companiaNombre/:name", companyController.getCompanyByName);
router.get("/companiaId/:id", companyController.getCompanyById);

router.put("/:id", companyController.updateCompany);
router.delete("/:id", companyController.deleteCompany);

router.post("/:id/logo", upload.single("logo"), companyController.uploadLogo);

router.get("/:id/benefits", companyController.getCompanyBenefitsById);

router.post("/:id/benefits", companyController.addCompanyBenefits);

router.delete(
  "/:id/benefits/:benefitId",
  companyController.deleteCompanyBenefit,
);
router.get("/:id/values", companyController.getCompanyValues);
router.post("/:id/values", companyController.addCompanyValue);
router.delete("/:id/values/:valueId", companyController.deleteCompanyValue);

export default router;
