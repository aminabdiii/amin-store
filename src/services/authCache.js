import { AUTH_EVENT } from "./authSession";
const privateKeys = new Set([
  "cart",
  "purchases",
  "allPurchases",
  "allUser",
  "userRole",
  "comments",
  "admin-products",
]);
export function bindAuthCache(client) {
  const onChange = () => {
    client.cancelQueries({
      predicate: (query) =>
        query.queryKey[0] === "user" || privateKeys.has(query.queryKey[0]),
    });
    client.removeQueries({
      predicate: (query) => privateKeys.has(query.queryKey[0]),
    });
    client.setQueryData(["user"], null);
    client.invalidateQueries({ queryKey: ["user"] });
  };
  window.addEventListener(AUTH_EVENT, onChange);
  return () => window.removeEventListener(AUTH_EVENT, onChange);
}
