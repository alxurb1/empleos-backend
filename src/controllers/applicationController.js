import * as applicationService from "../services/applicationService.js";

export const getApplicationsByUser = async (req, res, next) => {
  //usada para ver mis propias postulaciones en la vista de "mis postulaciones"
  try {
    const { id } = req.params;
    const result = await applicationService.getApplicationsByUser(id);
    res.json(result);
  } catch (error) {
    return next(error);
  }
};

export const getApplicationsByCompany = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await applicationService.getApplicationsByCompany(id);
    res.json(result);
  } catch (error) {
    return next(error);
  }
};

export const applyToVacancy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id_user } = req.body;
    const result = await applicationService.postCreateApplication(id_user, id);
    res.json(result);
  } catch (error) {
    return next(error);
  }
};

export const updateApplicationStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const result = await applicationService.putChangeApplicationStatus(
      id,
      status,
    );
    res.json(result);
  } catch (error) {
    return next(error);
  }
};
