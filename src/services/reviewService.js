import { supabase } from "../db.js";

export const getReviewsByCompany = async (companyId) => {
  const { data, error } = await supabase
    .from("company_reviews")
    .select("*")
    .eq("company_id", companyId);

  if (error) throw new Error(error.message);
  return data;
};

export const createReview = async (reviewData) => {
  const { data, error } = await supabase
    .from("company_reviews")
    .insert([reviewData])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const deleteReview = async (id) => {
  const { data, error } = await supabase
    .from("company_reviews")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};
