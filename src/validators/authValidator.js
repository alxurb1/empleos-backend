import { z } from "zod";

export const registerCandidateSchema = z.object({
  body: z.object({
    full_name: z.string().min(1, "El nombre completo es requerido"),
    email: z.string().email("Correo electrónico inválido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    role: z.string().optional(),
    phone: z.string().optional(),
    location: z.string().optional(),
    linkedin_url: z.string().url("URL de LinkedIn inválida").optional().or(z.literal("")),
    avatar_url: z.string().url().optional().or(z.literal("")),
    bio: z.string().optional(),
    professional_title: z.string().optional(),
    experience_level: z.string().optional(),
  }),
});

export const registerCompanySchema = z.object({
  body: z.object({
    full_name: z.string().min(1, "El nombre completo es requerido"),
    email: z.string().email("Correo electrónico inválido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    name: z.string().min(1, "El nombre de la empresa es requerido"),
    sector: z.string().optional(),
    size: z.string().optional(),
    description: z.string().optional(),
    mission: z.string().optional(),
    vision: z.string().optional(),
    website: z.string().url().optional().or(z.literal("")),
    email_company: z.string().email().optional().or(z.literal("")),
    phone: z.string().optional(),
    location: z.string().optional(),
    logo_url: z.string().url().optional().or(z.literal("")),
    linkedin_url: z.string().url().optional().or(z.literal("")),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Correo electrónico inválido"),
    password: z.string().min(1, "La contraseña es requerida"),
  }),
});
