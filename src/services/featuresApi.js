import { supabase } from "../../supabase";

export async function getAllFeatures() {
  const { data: features, error } = await supabase
    .from("features")
    .select("*")
    .order("id");

  if (error) throw new Error(error);

  return features;
}
