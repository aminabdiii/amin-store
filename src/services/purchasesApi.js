import { supabase } from "../../supabase";

export async function getUserPurchases({ userId, purchasePerPage, pageParam }) {
  const { data, error } = await supabase
    .from("purchases")
    .select("*")
    .eq("userId", userId)
    .order("created_at", { ascending: false })
    .range((pageParam - 1) * purchasePerPage, pageParam * purchasePerPage - 1);

  if (error) throw new Error(error);

  return data;
}
export async function getAllPurchases({ pageParam, numPurchasePerPage }) {
  const { data, error } = await supabase
    .from("purchases")
    .select("*")
    .order("created_at", { ascending: false })
    .range(
      (pageParam - 1) * numPurchasePerPage,
      pageParam * numPurchasePerPage - 1,
    );

  if (error) throw new Error(error);

  return data;
}

export async function insertUserPurchases({ ...info }) {
  const { data, error } = await supabase
    .from("purchases")
    .insert([{ ...info }]);

  if (error) throw new Error(error);

  return data;
}
export async function deliveredPurchaseApi({ id }) {
  const { data, error } = await supabase
    .from("purchases")
    .update({ isDelivered: true })
    .eq("id", id);

  if (error) throw new Error(error);

  return data;
}
