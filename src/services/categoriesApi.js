import { supabase } from "../../supabase";

export async function getCategorySubMenus() {
  let { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("created_at");

  if (error) throw new Error(error);

  return data;
}
