import { supabase, supabaseAdmin } from "../db.js";

export const getAllVacancies = async (filters = {}) => {
  //Solo devuelve vacantes con status:active, si cambia el status, no se asusten si no aparece en postman
  let query = supabase
    .from("vacancies")
    .select(`*, companies (name, logo_url, sector, location, is_verified)`)
    .eq("status", "active")
    .order("published_at", { ascending: false });

  if (filters.category) query = query.eq("category", filters.category);
  if (filters.modality) query = query.eq("modality", filters.modality);
  if (filters.location)
    query = query.ilike("location", `%${filters.location}%`);
  if (filters.experience_level)
    query = query.eq("experience_level", filters.experience_level);
  if (filters.contract_type)
    query = query.eq("contract_type", filters.contract_type);
  if (filters.salary_min) query = query.gte("salary_min", filters.salary_min);
  if (filters.salary_max) query = query.lte("salary_max", filters.salary_max);
  if (filters.search) query = query.ilike("title", `%${filters.search}%`);

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
};

export const getVacancyById = async (id_vacancy) => {
  const { data, error } = await supabase
    .from("vacancies")
    .select(
      `*, companies(name, logo_url, sector, size, location, website, email, phone, is_verified)`,
    )
    .eq("id_vacancy", id_vacancy)
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const getVacanciesByCompany = async (id_company) => {
  const { data, error } = await supabase
    .from("vacancies")
    .select("*")
    .eq("id_company", id_company)
    .eq("status", "active")
    .order("published_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};

export const postCreateVacancy = async (dataVacancy) => {
  const {
    id_company,
    title,
    category = null,
    contract_type = null,
    modality = null,
    location = null,
    experience_level = null,
    salary_min = null,
    salary_max = null,
    description = null,
    requirements = null,
    benefits = null,
    expires_at = null,
  } = dataVacancy;

  const { data: company, error: companyError } = await supabase
    .from("companies")
    .select("id_company")
    .eq("id_company", id_company)
    .eq("is_active", true)
    .single();

  if (companyError || !company)
    throw new Error("Empresa no encontrada o inactiva");

  if (salary_min > salary_max) {
    throw new Error("El salario mínimo no puede ser mayor al salario máximo");
  }

  const { data, error } = await supabaseAdmin
    .from("vacancies")
    .insert([
      {
        id_company,
        title,
        category,
        contract_type,
        modality,
        location,
        experience_level,
        salary_min,
        salary_max,
        description,
        requirements,
        benefits,
        expires_at,
        status: "active",
      },
    ])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const putUpdateVacancy = async (id_vacancy, dataVacancy) => {
  const { data, error } = await supabaseAdmin
    .from("vacancies")
    .update(dataVacancy)
    .eq("id_vacancy", id_vacancy)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const putUpdateVacancyStatus = async (id_vacancy, status) => {
  const validStatus = ["active", "paused", "expired", "deleted"];
  if (!validStatus.includes(status)) {
    throw new Error(
      `Estado inválido. Debe ser uno de: ${validStatus.join(", ")}`,
    );
  }

  const { data, error } = await supabaseAdmin
    .from("vacancies")
    .update({ status })
    .eq("id_vacancy", id_vacancy)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};
