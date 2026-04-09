import * as companyService from "../services/companyService.js";

export const getCompanies = async (req, res, next) => {
  try {
    const result = await companyService.getAllCompanies();
    res.json(result);
  } catch (error) {
    return next(error);
  }
};

export const getCompanyByName = async (req, res, next) => {
  try {
    const { name } = req.params;
    const result = await companyService.getCompanyByName(name);
    res.json(result);
  } catch (error) {
    return next(error);
  }
};

export const getCompanyById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await companyService.getCompanyById(id);
    res.json(result);
  } catch (error) {
    return next(error);
  }
};

export const updateCompany = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await companyService.putUpdateCompany(id, req.body);
    res.json(result);
  } catch (error) {
    return next(error);
  }
};

export const deleteCompany = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await companyService.deleteCompany(id);
    res.json(result);
  } catch (error) {
    return next(error);
  }
};

export const uploadLogo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const file = req.file;

    if (!file) {
      const error = new Error("No se envió ningun archivo");
      error.statusCode = 400;
      return next(error);
    }

    const result = await companyService.uploadLogoCompany(id, file);
    res.json(result);
  } catch (error) {
    return next(error);
  }
};

export const getCompanyBenefitsById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await companyService.getBenefitsById(id);
    res.json(result);
  } catch (error) {
    return next(error);
  }
};

export const addCompanyBenefits = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { benefit } = req.body;
    const result = await companyService.addCompanyBenefitsById(id, benefit);
    res.json(result);
  } catch (error) {
    return next(error);
  }
};

export const deleteCompanyBenefit = async (req, res, next) => {
  try {
    const { id: id_company, benefitId: id_benefit } = req.params;
    const result = await companyService.deleteCompanyBenefitById(
      id_benefit,
      id_company,
    );

    res.json(result);
  } catch (error) {
    return next(error);
  }
};
