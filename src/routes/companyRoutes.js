import { Router } from "express";

import * as companyController from "../controllers/companyController.js";

import { getCompanyValues } from "../controllers/companyController.js";

const router = Router();

router.get("/", companyController.getCompanies);
router.get("/companiaNombre/:name", companyController.getCompanyByName);
router.get("/companiaId/:id", companyController.getCompanyById);

router.put("/:id", companyController.updateCompany);

router.get("/:id/values", getCompanyValues);
router.post("/:id/values", companyController.addCompanyValue);
router.delete("/:id/values/:valueId", companyController.deleteCompanyValue);

export default router;
