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
  const { data, error } = await supabase.from("vacancies").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const getAllMetrics = async () => {
  const { data, error } = await supabase
    .from("admin_platform_metrics")
    .select("*")
    .single();

  if (error) throw new Error(error.message);

  return data;
};

export const updateUserStatus = async (id, is_active) => {
  if (typeof is_active !== "boolean")
    throw new Error("is_active debe de ser booleano");

  const { error } = await supabase
    .from("users")
    .update({ is_active: is_active })
    .eq("id_user", id);

  if (error) throw new Error(error.message);

  return { message: "Estado del usuario actualizado correctamente" };
};

export const updateCompanyStatus = async (id, is_active) => {
  if (typeof is_active !== "boolean")
    throw new Error("is_active debe de ser booleano");

  const { error } = await supabase
    .from("companies")
    .update({ is_active: is_active })
    .eq("id_company", id);

  if (error) throw new Error(error.message);

  return { message: "Estado de la compañia actualizado correctamente" };
};

export const getAllReviews = async () => {
  const { data, error } = await supabase.from("company_reviews").select("*");

  if (error) throw new Error(error.message);

  return data;
};

export const updateReviewStatus = async (id, status) => {
  const { error } = await supabase
    .from("company_reviews")
    .update({ status: status })
    .eq("id", id);

  if (error) throw new Error(error.message);

  return { message: "Estado de la revision actualizado correctamente" };
};

export const deleteReview = async (id) => {
  const { data, error } = await supabase
    .from("company_reviews")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);

  return { message: "Registro eliminado correctamente" };
};

export const getAllForumPosts = async () => {
  const { data, error } = await supabase.from("forum_posts").select("*");

  if (error) throw new Error(error.message);

  return data;
};

export const deleteForumPost = async (id) => {
  const { data, error } = await supabase
    .from("forum_posts")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);

  return { message: "Registro eliminado correctamente" };
};
