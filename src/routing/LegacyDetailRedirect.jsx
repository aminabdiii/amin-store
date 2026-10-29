import { Navigate, useLocation } from "react-router-dom";
import NotFound from "../ui/NotFound";

function LegacyDetailRedirect({ parameter, buildPath }) {
  const { search, hash } = useLocation();
  const params = new URLSearchParams(search);
  const id = params.get(parameter)?.trim();
  if (!id) return <NotFound />;
  params.delete(parameter);
  const query = params.toString();
  return (
    <Navigate
      replace
      to={`${buildPath(id)}${query ? `?${query}` : ""}${hash}`}
    />
  );
}

export default LegacyDetailRedirect;
