import { supabase, supabaseAdmin } from "../db.js";

export const getAllResources = async (filters = {}) => {
  let query = supabase
    .from("resources")
    .select("*")
    .order("created_at", { ascending: false });

  if (filters.category) query = query.eq("category", filters.category);
  if (filters.content_type)
    query = query.eq("content_type", filters.content_type);
  if (filters.search) query = query.ilike("title", `%${filters.search}%`);

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
};

export const getResourceById = async (id_resource) => {
  const { data, error } = await supabase
    .from("resources")
    .select("*")
    .eq("id_resource", id_resource)
    .single();
  if (error) throw new Error(error.message);
  return data;
};

export const postNewResource = async (dataResource) => {
  const {
    title,
    category,
    content_type,
    description = null,
    url = null,
    thumbnail_url = null,
    read_time_minutes = null,
  } = dataResource;

  const validCategories = [
    "interviews",
    "professional_development",
    "technical_skills",
    "cv_portfolio",
  ];
  if (!validCategories.includes(category)) {
    throw new Error(
      `Categoría inválida. Debe ser una de: ${validCategories.join(", ")}`,
    );
  }

  const validContentTypes = ["article", "video", "tutorial"];
  if (!validContentTypes.includes(content_type)) {
    throw new Error(
      `Tipo inválido. Debe ser uno de: ${validContentTypes.join(", ")}`,
    );
  }

  const { data, error } = await supabaseAdmin
    .from("resources")
    .insert([
      {
        title,
        category,
        content_type,
        description,
        url,
        thumbnail_url,
        read_time_minutes,
      },
    ])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const deleteResource = async (id_resource) => {
  const { data: existing, error: findError } = await supabase
    .from("resources")
    .select("*")
    .eq("id_resource", id_resource)
    .single();

  if (findError || !existing) throw new Error("Recurso no encontrado");

  const { error } = await supabaseAdmin
    .from("resources")
    .delete()
    .eq("id_resource", id_resource);

  if (error) throw new Error(error.message);
  return { message: "Recurso eliminado correctamente" };
};
