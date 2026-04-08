// authService.js
import { supabase, supabaseAdmin } from "../db.js";

export const registerCandidate = async (dataUser) => {
  const {
    full_name,
    email,
    password,
    role,
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

  const { data, error } = await supabaseAdmin
    .from("users")
    .insert([
      {
        id_user: authData.user.id, //Supabase tiene otra "tabla" con los usuarios que se registran, básicamente es como una FK, manda el id de esa tabla, y pone ese mismo id en esta otra tabla users
        full_name,
        email,
        role: "candidate",
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

  if (error) throw new Error(error.message);
  return data;
};

export const registerCompany = async (dataCompany) => {
  const {
    full_name,
    email,
    password,
    name,
    sector = null,
    size = null,
    description = null,
    mission = null,
    vision = null,
    website = null,
    email_company = null,
    phone = null,
    location = null,
    logo_url = null,
    linkedin_url = null,
  } = dataCompany;

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });
  if (authError) throw new Error(authError.message);

  const { data: userData, error: userError } = await supabaseAdmin
    .from("users")
    .insert([
      {
        id_user: authData.user.id,
        full_name,
        email,
        role: "company",
      },
    ])
    .select()
    .single();
  if (userError) throw new Error(userError.message);

  const { data: companyData, error: companyError } = await supabaseAdmin
    .from("companies")
    .insert([
      {
        id_user: authData.user.id,
        name,
        sector,
        size,
        description,
        mission,
        vision,
        website,
        email: email_company,
        phone,
        location,
        logo_url,
        linkedin_url,
      },
    ])
    .select()
    .single();
  if (companyError) throw new Error(companyError.message);

  return { user: userData, company: companyData };
};
