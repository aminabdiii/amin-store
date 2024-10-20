import { supabase } from "../../supabase";

export async function getLatestArticles() {
  const { data, error } = await supabase
    .from("articles")
    .select("id, image, title")
    .limit(6)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error);

  return data;
}
export async function getArticles() {
  const { data, error } = await supabase
    .from("articles")
    .select("id, image, title")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error);

  return data;
}

export async function getDetailsArticle({ id }) {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error);

  return data;
}

export async function insertNewArticleApi({ ...values }) {
  const { data, error } = await supabase.from("articles").insert({ ...values });

  if (error) throw new Error(error);

  return data;
}
export async function updateArticleApi({ id, ...values }) {
  const { data, error } = await supabase
    .from("articles")
    .update({ ...values })
    .eq("id", id);

  if (error) throw new Error(error);

  return data;
}
