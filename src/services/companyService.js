import { supabase } from "../db.js";

export const getAllCompanies = async () => {
  const { data, error } = await supabase.from("companies").select("*");
  if (error) throw new Error(error.message);
  return data;
};

export const getCompanyByName = async (name) => {
  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .ilike("name", `%${name}%`);
  if (error) throw new Error(error.message);
  return data;
};

export const getCompanyById = async (id_company) => {
  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .eq("id_company", id_company);

  if (error) throw new Error(error.message);
  return data;
};

export const putUpdateCompany = async (id_company, dataCompany) => {
  const { data, error } = await supabase
    .from("companies")
    .update(dataCompany)
    .eq("id_company", id_company)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
};

export const deleteCompany = async (id_company) => {
  const { error } = await supabase
    .from("companies")
    .update({ is_active: false })
    .eq("id_company", id_company);

  if (error) throw new Error(error.message);
  return { message: "Empresa desactivada correctamente" };
};
