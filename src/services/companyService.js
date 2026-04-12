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

export const uploadLogoCompany = async (id_company, file) => {
  const fileName = `${id_company}-${Date.now()}.${file.mimetype.split("/")[1]}`;
  const { error: uploadError } = await supabase.storage
    .from("logos")
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
      upsert: true,
    });
  if (uploadError) throw uploadError;
  const { data } = supabase.storage.from("logos").getPublicUrl(fileName);
  const { error: dbError } = await supabase
    .from("companies")
    .update({ logo_url: data.publicUrl })
    .eq("id_company", id_company);
  if (dbError) throw dbError;
  return { message: "Logo actualizado", logo_url: data.publicUrl };
};

export const getBenefitsById = async (id_company) => {
  const { data, error } = await supabase
    .from("company_benefits")
    .select("*")
    .eq("company_id", id_company);
  if (error) throw new Error(error.message);
  return data;
};

export const addCompanyBenefitsById = async (id_company, benefit) => {
  const { data, error } = await supabase
    .from("company_benefits")
    .insert({ company_id: id_company, benefit })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
};

export const deleteCompanyBenefitById = async (id_benefit, id_company) => {
  const { data, error } = await supabase
    .from("company_benefits")
    .delete()
    .eq("id", id_benefit)
    .eq("company_id", id_company)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return { message: "Beneficio eliminado correctamente", deleted: data };
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
    .insert([{ company_id: id_company, value_name: dataValue.value_name }])
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
    deleted: data,
  };
};

export const getCompanyRating = async (id_company) => {
  const { data, error } = await supabase
    .from("company_reviews")
    .select("rating")
    .eq("company_id", id_company); 

  if (error) throw new Error(error.message);

  if (data.length === 0) {
    return { 
      average_rating: 0, 
      total_reviews: 0 
    };
  }

  const totalReviews = data.length;
  const sumRatings = data.reduce((acumulador, reseña) => acumulador + reseña.rating, 0);
  
  const averageRating = (sumRatings / totalReviews).toFixed(1); 

  return {
    average_rating: parseFloat(averageRating),
    total_reviews: totalReviews
  };
};