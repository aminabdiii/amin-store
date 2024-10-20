import { supabase } from "../../supabase";

export async function getUserCartItems({ userId }) {
  const { data, error } = await supabase
    .from("carts")
    .select("cart_items")
    .eq("user_id", userId)
    .single();

  if (error) throw new Error(error);

  return data;
}

export async function getCartItemById({ productId, userId }) {
  const cartProductsData = await getUserCartItems({ userId });

  const productData = cartProductsData.find(
    (product) => product.id === productId,
  );

  return productData;
}

export async function addItemToCartApi({ product, userId }) {
  const cartProductsData = await getUserCartItems({ userId });

  const newProduct = { ...product, count: 1 };

  const newCartsUpdate = [...cartProductsData.cart_items, newProduct];

  const { error: updatingError, data } = await supabase
    .from("carts")
    .update({
      cart_items: newCartsUpdate,
    })
    .eq("user_id", userId);

  if (updatingError) throw new Error(updatingError);

  return data;
}

export async function removeItemToCartApi({ productId, userId }) {
  const cartProductsData = await getUserCartItems({ userId });

  const newCartUpdate = cartProductsData.cart_items.filter(
    (cart) => cart.id !== productId,
  );

  const { error: updatingError, data } = await supabase
    .from("carts")
    .update({
      cart_items: newCartUpdate,
    })
    .eq("user_id", userId);

  if (updatingError) throw new Error(updatingError);

  return data;
}

export async function updateProductCountFromCart({ productId, userId, count }) {
  const cartProductsData = await getUserCartItems({ userId });

  const filteringProduct = cartProductsData.cart_items.filter(
    (cart) => cart.id !== productId,
  );
  const findingProduct = cartProductsData.cart_items.find(
    (cart) => cart.id === productId,
  );
  const update = { ...findingProduct, count };

  const newCartUpdate = [...filteringProduct, update];

  const { data, error } = await supabase
    .from("carts")
    .update({
      cart_items: newCartUpdate,
    })
    .eq("user_id", userId);

  if (error) throw new Error(error);

  return data;
}

export async function clearUserCart({ userId }) {
  const { error: updatingError, data } = await supabase
    .from("carts")
    .update({
      cart_items: [],
    })
    .eq("user_id", userId);

  if (updatingError) throw new Error(updatingError);

  return data;
}
