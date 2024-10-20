import { supabase } from "../../supabase";

export async function getPopularBrands() {
  const { data, error } = await supabase.from("popular-brands").select("*");

  if (error) throw new Error(error);

  return data;
}
