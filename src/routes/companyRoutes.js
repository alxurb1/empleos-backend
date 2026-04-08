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

export default router;
