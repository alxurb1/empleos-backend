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

export const postCreateUser = async (dataUser) => {
  const {
    full_name,
    email,
    password,
    role = "candidate",
    phone = null,
    location = null,
    linkedin_url = null,
    avatar_url = null,
    bio = null,
    professional_title = null,
    experience_level = null,
  } = dataUser;

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) throw new Error(authError.message);

  const { data: userData, error: userError } = await supabase
    .from("users")
    .insert([
      {
        id_user: authData.user.id, //Supabase tiene otra "tabla" con los usuarios que se registran, básicamente es como una FK, manda el id de esa tabla, y pone ese mismo id en esta otra tabla users
        full_name,
        email,
        role,
        phone,
        location,
        linkedin_url,
        avatar_url,
        bio,
        professional_title,
        experience_level,
      },
    ])
    .select()
    .single();

  if (userError) throw new Error(userError.message);
  return userData;
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

export const deleteUser = async (id) => {
  const { error } = await supabase
    .from("users")
    .update({ is_active: false })
    .eq("id_user", id);

  if (error) throw new Error(error.message);
  return { message: "Usuario desactivado correctamente" };
};
