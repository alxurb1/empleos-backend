import { supabase } from "../db.js";

export const getAllUsers = async () => {
  const { data, error } = await supabase.from("users").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const getUserByName = async (name) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .ilike("full_name", `%${name}%`);

  if (error) throw new Error(error.message);
  return data;
};

export const getUserById = async (id) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id_user", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const putUpdateUser = async (id, dataUser) => {
  const { data, error } = await supabase
    .from("users")
    .update(dataUser)
    .eq("id_user", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};
