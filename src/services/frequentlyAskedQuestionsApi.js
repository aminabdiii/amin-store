import { supabase } from "../../supabase";

export async function getQuestions() {
  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) throw new Error(error);

  return data;
}
