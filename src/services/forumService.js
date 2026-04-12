import { supabase } from '../db.js';

export const getPosts = async (category) => {
    
  let query = supabase
    .from("forum_posts")
    .select("*");

  if (category) {
    query = query.eq("category", category);
  }

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  
  return data;
};

export const createPost = async (postData) => {
  const { data, error } = await supabase
    .from("forum_posts")
    .insert([postData])
    .select() 
    .single(); 
  if (error) throw new Error(error.message);
  return data;
};

export const updatePost = async (id, updateData) => {
  const { data, error } = await supabase
    .from("forum_posts")
    .update(updateData) 
    .eq("id", id)       
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const deletePost = async (id) => {
  const { data, error } = await supabase
    .from("forum_posts")
    .delete()
    .eq("id", id)
    .select() 
    .single();

  if (error) throw new Error(error.message);
  return data;
};