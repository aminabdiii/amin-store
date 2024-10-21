import { adminAuthClient, supabase } from "../../supabase";

export async function getUserApi() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function logoutApi() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error);
}

export async function uploadAvatar({ name, file }) {
  const { data, error } = await supabase.storage
    .from("usersProfile")
    .upload(name, file, { upsert: true });

  if (error) throw new Error(error);

  return data;
}

export async function updateUser({ avatar, fullName }) {
  const { data, error } = await supabase.auth.updateUser({
    data: { avatar, fullName },
    role: "admin",
  });

  if (error) throw new Error(error);

  return data;
}

export async function updateUserPassword({ password }) {
  const { data, error } = await supabase.auth.updateUser({
    password,
  });

  if (error) throw new Error(error);

  return data;
}

export async function userRoleApi() {
  const { id } = await getUserApi();

  const { data, error } = await supabase
    .from("users")
    .select("role")
    .eq("userId", id)
    .single();

  if (error) throw new Error(error);

  return data;
}

export async function getAllUsers() {
  const { data, error } = await adminAuthClient.listUsers({
    page: 1,
    perPage: 100,
  });

  if (error) throw new Error(error);

  return data;
}

export async function deleteUserApi({ userId }) {
  const { data, error } = await adminAuthClient.deleteUser(userId);

  if (error) throw new Error(error);

  return data;
}
