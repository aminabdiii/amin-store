import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollTop() {
  const { pathname, search } = useLocation();

  useEffect(
    function () {
      window.scrollTo(0, 0);
    },
    [pathname, search],
  );

  return null;
}

export default ScrollTop;
