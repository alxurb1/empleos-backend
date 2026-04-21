import * as profileService from "../services/profileService.js";

// ----------------------------------------------------EXPERIENCE-------------------------------------------------------
export const getExperience = async (req, res, next) => {
  try {
    const { id_user } = req.params;
    const result = await profileService.getExperienceByUser(id_user);
    res.json(result);
  } catch (error) {
    return next(error);
  }
};

export const postExperience = async (req, res, next) => {
  try {
    const { id_user } = req.params;
    const result = await profileService.createExperiencie(id_user, req.body);
    res.status(201).json(result);
  } catch (error) {
    return next(error);
  }
};

export const putExperience = async (req, res, next) => {
  try {
    const { id_experience } = req.params;
    const result = await profileService.updateExperience(
      id_experience,
      req.body,
    );
    res.json(result);
  } catch (error) {
    return next(error);
  }
};

export const deleteExperience = async (req, res, next) => {
  try {
    const { id_experience } = req.params;
    const result = await profileService.deleteExperience(id_experience);
    res.json(result);
  } catch (error) {
    return next(error);
  }
};

// ----------------------------------------------------CV-------------------------------------------------------
export const getCV = async (req, res, next) => {
  try {
    const { id_user } = req.params;
    const result = await profileService.getCVByUser(id_user);
    res.json(result);
  } catch (error) {
    return next(error);
  }
};

export const postCV = async (req, res, next) => {
  try {
    const { id_user } = req.params;
    if (!req.file) {
      return res.status(400).json({ message: "No se recibió ningún archivo" });
    }
    const result = await profileService.uploadCV(id_user, req.file);
    res.status(201).json(result);
  } catch (error) {
    return next(error);
  }
};

export const deleteCV = async (req, res, next) => {
  try {
    const { id_cv } = req.params;
    const result = await profileService.deleteCV(id_cv);
    res.json(result);
  } catch (error) {
    return next(error);
  }
};

// ----------------------------------------------------PROFILE-------------------------------------------------------

export const getProfile = async (req, res, next) => {
  try {
    const { id_user } = req.params;
    const result = await profileService.getProfile(id_user);
    res.json(result);
  } catch (error) {
    return next(error);
  }
};

export const putProfile = async (req, res, next) => {
  try {
    const { id_user } = req.params;
    const result = await profileService.updateProfile(id_user, req.body);
    res.json(result);
  } catch (error) {
    return next(error);
  }
};

export const uploadPhoto = async (req, res, next) => {
  try {
    const { id_user } = req.params;
    if (!req.file) {
      return res.status(400).json({ message: "No se recibió ningún archivo" });
    }
    const result = await profileService.uploadUserPhoto(id_user, req.file);
    res.json(result);
  } catch (error) {
    return next(error);
  }
};

// ----------------------------------------------------SKILLS-------------------------------------------------------

export const getSkills = async (req, res, next) => {
  try {
    const { id_user } = req.params;
    const result = await profileService.getSkillsByUser(id_user);
    res.json(result);
  } catch (error) {
    return next(error);
  }
};

export const postSkill = async (req, res, next) => {
  try {
    const { id_user } = req.params;
    const { name } = req.body;
    const result = await profileService.addSkill(id_user, name);
    res.status(201).json(result);
  } catch (error) {
    return next(error);
  }
};

export const deleteSkill = async (req, res, next) => {
  try {
    const { id_skill } = req.params;
    const result = await profileService.deleteSkill(id_skill);
    res.json(result);
  } catch (error) {
    return next(error);
  }
};

// ----------------------------------------------------ALERTS-------------------------------------------------------

export const getAlerts = async (req, res, next) => {
  try {
    const { id_user } = req.params;
    const result = await profileService.getAlertsByUser(id_user);
    res.json(result);
  } catch (error) {
    return next(error);
  }
};

export const postAlert = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const result = await profileService.createAlert(user_id, req.body);
    res.status(201).json(result);
  } catch (error) {
    return next(error);
  }
};

export const putAlert = async (req, res, next) => {
  try {
    const { id_alert } = req.params;
    const { is_active } = req.body;
    const result = await profileService.updateStatusAlert(id_alert, is_active);
    res.json(result);
  } catch (error) {
    return next(error);
  }
};

export const deleteAlert = async (req, res, next) => {
  try {
    const { id_alert } = req.params;
    const result = await profileService.deleteAlert(id_alert);
    res.json(result);
  } catch (error) {
    return next(error);
  }
};
