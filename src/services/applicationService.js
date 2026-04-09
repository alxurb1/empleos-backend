import { supabase, supabaseAdmin } from "../db.js";

export const getApplicationsByUser = async (id_user) => {
  const { data, error } = await supabase
    .from("applications")
    .select(
      `*, vacancies(title, modality, location, salary_min, salary_max, companies(name, logo_url))`,
    )
    .eq("id_user", id_user)
    .order("applied_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};

export const getApplicationsByCompany = async (id_company) => {
  const { data, error } = await supabase
    .from("applications")
    .select(
      `*, users(full_name, avatar_url, professional_title, experience_level), vacancies(id_vacancy, title)`,
    )
    .eq("vacancies.id_company", id_company)
    .order("applied_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};

export const postCreateApplication = async (id_user, id_vacancy) => {
  const { data: existing } = await supabase
    .from("applications")
    .select("id_application")
    .eq("id_user", id_user)
    .eq("id_vacancy", id_vacancy)
    .single();

  if (existing) throw new Error("Ya estás postulado a esta vacante");

  const { data, error } = await supabaseAdmin
    .from("applications")
    .insert([{ id_user, id_vacancy }])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const putChangeApplicationStatus = async (id_application, status) => {
  const { data, error } = await supabaseAdmin
    .from("applications")
    .update({ status })
    .eq("id_application", id_application)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};
