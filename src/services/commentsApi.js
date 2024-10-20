import { supabase } from "../../supabase";

export async function getCommentsByProductIdApi({ productId }) {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("productId", productId);

  if (error) throw new Error(error);

  return data;
}
export async function getAllComments({ pageParam, COMMENTS_PER_PAGE }) {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .order("created_at", { ascending: false })
    .range(
      (pageParam - 1) * COMMENTS_PER_PAGE,
      pageParam * COMMENTS_PER_PAGE - 1,
    );

  if (error) throw new Error(error);

  return data;
}

export async function insertCommentApi({ ...commentInfo }) {
  const { data, error } = await supabase
    .from("comments")
    .insert([{ ...commentInfo }]);

  if (error) throw new Error(error);

  return data;
}

export async function updateUserAvatarFromComment({ useravatar, userId }) {
  const { data, error } = await supabase
    .from("comments")
    .update({ useravatar })
    .eq("userId", userId);

  if (error) throw new Error(error);

  return data;
}
export async function confirmUserCommentApi({ id }) {
  const { data, error } = await supabase
    .from("comments")
    .update({ isConfirm: true })
    .eq("id", id);

  if (error) throw new Error(error);

  return data;
}
export async function deleteCommentApi({ id }) {
  const { data, error } = await supabase.from("comments").delete().eq("id", id);

  if (error) throw new Error(error);

  return data;
}
