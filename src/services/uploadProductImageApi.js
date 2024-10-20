import { supabase } from "../../supabase";

export async function uploadProductImageApi({ path, fileName, fileBody }) {
  const { data, error } = await supabase.storage
    .from(path)
    .upload(fileName, fileBody, { upsert: true });

  if (error) throw new Error(error);

  return data;
}
