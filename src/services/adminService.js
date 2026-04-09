import { supabase, supabaseAdmin } from "../db.js";

export const deleteUser = async (id) => {
  const { error } = await supabase
    .from("users")
    .update({ is_active: false })
    .eq("id_user", id);

  if (error) throw new Error(error.message);
  return { message: "Usuario desactivado correctamente" };
};

export const deleteCompany = async (id_company) => {
  const { error } = await supabase
    .from("companies")
    .update({ is_active: false })
    .eq("id_company", id_company);

  if (error) throw new Error(error.message);
  return { message: "Empresa desactivada correctamente" };
};

export const getAllJobs = async () => {
  const { data, error } = await supabase.from("vacancies");
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
