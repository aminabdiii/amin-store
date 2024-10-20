import { supabase } from "../../supabase";

export async function signInUser({ fullName, userName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        avatar: "",
        fullName,
        userName,
      },
    },
  });
  if (error) throw new Error(error);

  const { data: cart } = await supabase
    .from("carts")
    .select("*")
    .eq("user_id", data.user.id);

  if (!cart.length) {
    await supabase
      .from("carts")
      .insert([
        {
          user_id: data.user.id,
          cart_items: [],
          purchases: [],
        },
      ])
      .select();
  }

  const { data: users } = await supabase
    .from("users")
    .select("*")
    .eq("userId", data.user.id);
  if (!users.length) {
    await supabase.from("users").insert([
      {
        userId: data.user.id,
        role: "authenticated",
      },
    ]);
  }

  return data;
}

export async function loginUserApi({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error);

  const { data: cart } = await supabase
    .from("carts")
    .select("*")
    .eq("user_id", data.user.id);

  if (!cart.length) {
    await supabase
      .from("carts")
      .insert([
        {
          user_id: data.user.id,
          cart_items: [],
          purchases: [],
        },
      ])
      .select();
  }

  const { data: users } = await supabase
    .from("users")
    .select("*")
    .eq("userId", data.user.id);

  if (!users.length) {
    await supabase.from("users").insert([
      {
        userId: data.user.id,
        role: "authenticated",
      },
    ]);
  }

  return data;
}
