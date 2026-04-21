import { supabase, supabaseAdmin } from "../db.js";

// ----------------------------------------------------EXPERIENCE-------------------------------------------------------
export const getExperienceByUser = async (id_user) => {
  const { data, error } = await supabase
    .from("work_experiences")
    .select("*")
    .eq("id_user", id_user)
    .order("start_year", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};

export const createExperiencie = async (id_user, dataExperience) => {
  const {
    job_title,
    company_name,
    start_year,
    end_year = null,
    description = null,
  } = dataExperience;

  const { data, error } = await supabaseAdmin
    .from("work_experiences")
    .insert([
      { id_user, job_title, company_name, start_year, end_year, description },
    ])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const updateExperience = async (id_experience, dataExperience) => {
  const { data, error } = await supabaseAdmin
    .from("work_experiences")
    .update(dataExperience)
    .eq("id_experience", id_experience)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const deleteExperience = async (id_experience) => {
  const { data, error } = await supabaseAdmin
    .from("work_experiences")
    .delete()
    .eq("id_experience", id_experience);

  if (error) throw new Error(error.message);
  return { message: "Experiencia eliminada correctamente" };
};

// ----------------------------------------------------CV-------------------------------------------------------
export const getCVByUser = async (id_user) => {
  const { data, error } = await supabase
    .from("cvs")
    .select("*")
    .eq("id_user", id_user)
    .order("uploaded_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};

export const uploadCV = async (id_user, file) => {
  const fileName = `${id_user}_${Date.now()}_${file.originalname}`;

  const { data: storageData, error: storageError } = await supabaseAdmin.storage
    .from("cvs")
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });

  if (storageError) throw storageError;

  const { data: urlData } = supabaseAdmin.storage
    .from("cvs")
    .getPublicUrl(fileName);

  const { data, error } = await supabaseAdmin
    .from("cvs")
    .insert([
      {
        id_user,
        file_url: urlData.publicUrl,
        file_name: file.originalname,
        file_size_kb: Math.round(file.size / 1024),
      },
    ])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const deleteCV = async (id_cv) => {
  const { data: existing, error: findError } = await supabase
    .from("cvs")
    .select("id_cv")
    .eq("id_cv", id_cv)
    .single();

  if (findError || !existing) throw new Error("CV no encontrado");

  const { error } = await supabaseAdmin.from("cvs").delete().eq("id_cv", id_cv);

  if (error) throw new Error(error.message);
  return { message: "CV eliminado correctamente" };
};

// ----------------------------------------------------PROFILE-------------------------------------------------------
export const getProfile = async (id_user) => {
  const { data, error } = await supabase
    .from("users")
    .select(
      `
      *,
      skills (id_skill, name),
      work_experiences (
        id_experience,
        job_title,
        company_name,
        start_year,
        end_year,
        description
      ),
      cvs (id_cv, file_url, file_name, uploaded_at)
    `,
    )
    .eq("id_user", id_user)
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const updateProfile = async (id_user, dataProfile) => {
  const { data, error } = await supabaseAdmin
    .from("users")
    .update(dataProfile)
    .eq("id_user", id_user)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const uploadUserPhoto = async (id_user, file) => {
  const ext = file.mimetype.split("/")[1] || "jpg";
  const fileName = `${id_user}.${ext}`;

  const { error: uploadError } = await supabaseAdmin.storage
    .from("avatars")
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
      upsert: true,
    });

  if (uploadError) throw uploadError;

  const { data } = supabaseAdmin.storage.from("avatars").getPublicUrl(fileName);

  const { error: dbError } = await supabaseAdmin
    .from("users")
    .update({ avatar_url: data.publicUrl })
    .eq("id_user", id_user);

  if (dbError) throw new Error(dbError.message);

  return {
    message: "Foto actualizada correctamente",
    avatar_url: data.publicUrl,
  };
};

// ----------------------------------------------------SKILLS-------------------------------------------------------
export const getSkillsByUser = async (id_user) => {
  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .eq("id_user", id_user)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};

export const addSkill = async (id_user, name) => {
  const { data, error } = await supabaseAdmin
    .from("skills")
    .insert([{ id_user, name }])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const deleteSkill = async (id_skill) => {
  const { error } = await supabaseAdmin
    .from("skills")
    .delete()
    .eq("id_skill", id_skill)
    .single();

  if (error) throw new Error(error.message);
  return { message: "Habilidad eliminada correctamente" };
};

// ----------------------------------------------------ALERTS-------------------------------------------------------

export const getAlertsByUser = async (id_user) => {
  const { data, error } = await supabase
    .from("job_alerts")
    .select("*")
    .eq("user_id", id_user)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};

export const createAlert = async (user_id, dataAlert) => {
  const {
    name,
    keywords = null,
    location = null,
    category = null,
    frequency = "daily",
  } = dataAlert;

  const { data, error } = await supabaseAdmin
    .from("job_alerts")
    .insert([{ user_id, name, keywords, location, category, frequency }])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const updateStatusAlert = async (id_alert, is_active) => {
  const { data, error } = await supabaseAdmin
    .from("job_alerts")
    .update({ is_active })
    .eq("id_alert", id_alert)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const deleteAlert = async (id_alert) => {
  const { error } = await supabase
    .from("job_alerts")
    .delete()
    .eq("id_alert", id_alert)
    .single();

  if (error) throw new Error(error.message);
  return { message: "Alerta eliminada correctamente" };
};
