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

export const getCompanyValues = async (id_company) => {
  const { data, error } = await supabase
    .from("company_values")
    .select("*")
    .eq("company_id", id_company);
  if (error) throw new Error(error.message);
  return data;
};

export const addCompanyValue = async (id_company, dataValue) => {
  const { data, error } = await supabase
    .from("company_values")
    .insert([
      { 
        company_id: id_company, 
        value_name: dataValue.value_name 
      }
    ])
    .select() 
    .single(); 
  if (error) throw new Error(error.message);
  return data;
};

export const deleteCompanyValue = async (id_company, value_id) => {
  const { data, error } = await supabase
    .from("company_values")
    .delete()
    .eq("id", value_id)
    .eq("company_id", id_company) 
    .select()
    .single();

  if (error) throw new Error(error.message);
  
  return { 
    message: "Valor corporativo eliminado correctamente", 
    deleted_value: data 
  };
};