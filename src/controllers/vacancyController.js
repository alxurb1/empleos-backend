import * as vacancyService from "../services/vacancyService.js";

export const getVacancies = async (req, res, next) => {
  try {
    const result = await vacancyService.getAllVacancies();
    res.json(result);
  } catch (error) {
    return next(error);
  }
};

export const getVacancyById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await vacancyService.getVacancyById(id);
    res.json(result);
  } catch (error) {
    return next(error);
  }
};

export const getVacanciesByCompany = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await vacancyService.getVacanciesByCompany(id);
    res.json(result);
  } catch (error) {
    return next(error);
  }
};

export const createVacancy = async (req, res, next) => {
  try {
    const result = await vacancyService.postCreateVacancy(req.body);
    res.json(result);
  } catch (error) {
    return next(error);
  }
};

export const updateVacancy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await vacancyService.putUpdateVacancy(id, req.body);
    res.json(result);
  } catch (error) {
    return next(error);
  }
};

export const updateVacancyStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const result = await vacancyService.putUpdateVacancyStatus(id, status);
    res.json(result);
  } catch (error) {
    return next(error);
  }
};

export const searchVacancies = async (req, res, next) => {
  try {
    const result = await vacancyService.searchVacancies(req.query);
    res.json(result);
  } catch (error) {
    return next(error);
  }
};