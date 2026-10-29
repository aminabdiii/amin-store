export const productPath = (id) => `/products/${encodeURIComponent(id)}`;
export const articlePath = (id) => `/articles/${encodeURIComponent(id)}`;
export const categoryPath = (category) =>
  `/products/category/${encodeURIComponent(category.replaceAll(" ", "-"))}`;
export const panelPath = (page = "accountDetails") => `/userPanel/${page}`;

export function getReturnPath(state) {
  const from = state?.from;
  const path =
    typeof from === "string"
      ? from
      : from?.pathname &&
        `${from.pathname}${from.search || ""}${from.hash || ""}`;
  if (
    !path ||
    !path.startsWith("/") ||
    path.startsWith("//") ||
    path.includes("\\")
  )
    return "/home";
  const url = new URL(path, window.location.origin);
  if (
    url.origin !== window.location.origin ||
    /^\/(login|sign-in)\/?$/i.test(url.pathname)
  )
    return "/home";
  return `${url.pathname}${url.search}${url.hash}`;
}
