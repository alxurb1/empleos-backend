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

  if (error) {
    // Si falla la inserción en nuestra tabla, eliminamos el usuario de Auth para evitar que quede huérfano
    await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
    throw new Error(error.message);
  }
  return { userData: data, token: authData.session.access_token };
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
  if (userError) {
    await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
    throw new Error(userError.message);
  }

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

  if (companyError) {
    await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
    // Intentamos limpiar también la tabla de users por seguridad
    await supabaseAdmin.from("users").delete().eq("id_user", authData.user.id);
    throw new Error(companyError.message);
  }

  return {
    userData: userData,
    company: companyData,
    token: authData.session.access_token,
  };
};

export const loginCandidate = async (dataUser) => {
  const { email, password } = dataUser;
  const { data: authUserData, error: authUserError } =
    await supabase.auth.signInWithPassword({
      email,
      password,
      options: {
        shouldCreateUser: false,
      },
    });
  if (authUserError) throw new Error(authUserError.message);
  const { data: userData, error: userError } = await supabaseAdmin
    .from("users")
    .select()
    .eq("id_user", authUserData.user.id)
    .single();
  if (userError) throw new Error(userError.message);
  return { userData: userData, token: authUserData.session.access_token };
};

export const loginCompany = async (dataCompany) => {
  const { email, password } = dataCompany;
  const { data: authData, error: authError } =
    await supabase.auth.signInWithPassword({
      email,
      password,
      options: {
        shouldCreateUser: false,
      },
    });
  if (authError) throw new Error(authError.message);
  const { data: companyData, error: companyError } = await supabaseAdmin
    .from("companies")
    .select()
    .eq("id_user", authData.user.id)
    .single();
  if (companyError) throw new Error(companyError.message);
  return { userData: companyData, token: authData.session.access_token };
};

export const loginAdmin = async (dataAdmin) => {
  const { email, password } = dataAdmin;
  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email,
    password,
    options: {
      shouldCreateUser: false,
    },
  });
  if (error) throw new Error(error.message);
  const { data: adminData, error: adminError } = await supabaseAdmin
    .from("users")
    .select()
    .eq("id_user", authData.user.id)
    .eq("role", "admin")
    .single();
  if (adminError) throw new Error(adminError.message);
  return { userData: adminData, token: authData.session.access_token };
};

export const logout = async () => {
  const { error: logoutCompanyError } = await supabase.auth.signOut();

  if (logoutCompanyError) throw new Error(logoutCompanyError.message);
};
