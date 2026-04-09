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

export const getCompanyValues = async (req, res, next) => {
  try {
    const { id } = req.params;
    // Llamamos a la función que crearemos en el servicio
    const result = await companyService.getCompanyValues(id); 
    res.json(result);
  } catch (error) {
    return next(error);
  }
};

export const addCompanyValue = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await companyService.addCompanyValue(id, req.body);
    res.json(result);
  } catch (error) {
    return next(error);
  }
};

export const deleteCompanyValue = async (req, res, next) => {
  try {
    const { id, valueId } = req.params;
    
    const result = await companyService.deleteCompanyValue(id, valueId);
    
    res.json(result);
  } catch (error) {
    return next(error);
  }
};