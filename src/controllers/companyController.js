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
