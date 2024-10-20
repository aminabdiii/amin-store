import { supabase } from "../../supabase";

export async function getLimitProducts({ limit }) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .limit(limit)
    .order("created_at", { ascending: false });
  // .eq("isAvailable", true);

  if (error) throw new Error(error);

  return data;
}

export async function getDiscountProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .gt("discount", 0)
    .limit(12);

  if (error) throw new Error(error);

  return data;
}

export async function getDetailProduct({ id }) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error);

  return data;
}

export async function getProductsByCategory({
  category,
  sort,
  presale,
  availableProducts,
  discountProducts,
  search,
  pageParam,
}) {
  const pageSize = 9;
  const query = supabase
    .from("products")
    .select(
      "id, title, postType, price, discount, image, rate , isPreSale, isAvailable",
    )
    .range((pageParam - 1) * pageSize, pageParam * pageSize - 1);

  if (sort === "most-view") query.order("view", { ascending: false });
  else if (sort === "cheapest") query.order("price", { ascending: true });
  else if (sort === "most-expensive")
    query.order("price", { ascending: false });
  else if (sort === "default") query.order("id", { ascending: false });
  else if (sort === "fastest-shipping")
    query.order("postType", { ascending: true });
  else if (!sort) query.order("rate", { ascending: false });
  else if (sort === "rate") query.order("rate", { ascending: false });
  else if (sort === "newest") query.order("created_at", { ascending: false });

  if (presale === "true") query.eq("isPreSale", true);
  if (availableProducts === "true") query.eq("isAvailable", true);
  if (discountProducts === "true") query.gt("discount", 0);

  if (search) query.ilike("title", `%${search}%`);

  const { data, error } = await query.eq(
    "category",
    category.split("-").join(" "),
  );

  if (error) throw new Error(error);

  return data;
}

export async function getAllProducts({
  sort,
  presale,
  availableProducts,
  discountProducts,
  search,
  pageParam,
}) {
  const pageSize = 9;
  const query = supabase
    .from("products")
    .select(
      "id, title, postType, price, discount, image, rate , isPreSale, isAvailable",
    )
    .range((pageParam - 1) * pageSize, pageParam * pageSize - 1);

  if (sort === "most-view") query.order("view", { ascending: false });
  else if (sort === "cheapest") query.order("price", { ascending: true });
  else if (sort === "most-expensive")
    query.order("price", { ascending: false });
  else if (sort === "default") query.order("id", { ascending: false });
  else if (sort === "fastest-shipping")
    query.order("postType", { ascending: true });
  else if (sort === "rate") query.order("rate", { ascending: false });
  else if (!sort) query.order("rate", { ascending: false });
  else if (sort === "newest") query.order("created_at", { ascending: false });

  if (presale === "true") query.eq("isPreSale", true);
  if (availableProducts === "true") query.eq("isAvailable", true);
  if (discountProducts === "true") query.gt("discount", 0);

  if (search) query.ilike("title", `%${search}%`);

  const { data, error } = await query;

  if (error) throw new Error(error);

  return data;
}

export async function updateProductView({ view, id }) {
  const { data, error } = await supabase
    .from("products")
    .update({ view: view })
    .eq("id", id)
    .select();

  if (error) throw new Error(error);

  return data;
}

export async function insertNewProductApi({ ...values }) {
  const { data, error } = await supabase.from("products").insert([values]);

  if (error) throw new Error(error);

  return data;
}
export async function updateProductApi({ id, ...values }) {
  const { data, error } = await supabase
    .from("products")
    .update(values)
    .eq("id", id);

  if (error) throw new Error(error);

  return data;
}

export async function getRelatedProducts({ category, expectProductId }) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", category)
    .limit(4)
    .neq("id", expectProductId);

  if (error) throw new Error(error);

  return data;
}
