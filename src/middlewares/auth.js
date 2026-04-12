import { supabase } from "../db.js";

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      const error = new Error("Token no proporcionado");
      error.statusCode = 401;
      return next(error);
    }

    const token = authHeader.split(" ")[1];

    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      const err = new Error("Token invalido o expirado");
      err.statusCode = 401;
      return next(err);
    }

    const { data: userDb, error: userError } = await supabase
      .from("users")
      .select("role, is_active")
      .eq("id_user", data.user.id)
      .single();

    if (userError || !userDb) {
      const err = new Error("Usuario no encontrado");
      err.statusCode = 404;
      return next(err);
    }

    if (!userDb.is_active) {
      const err = new Error("Usuario inactivo");
      err.statusCode = 403;
      return next(err);
    }

    req.user = { ...data.user, role: userDb.role };
    next();
  } catch (error) {
    return next(error);
  }
};
