import { supabase } from "../db.js";

export const getAllUsers = async () => {
  const { data, error } = await supabase.from("users").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
