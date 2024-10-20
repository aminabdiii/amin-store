import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link
      to="/home"
      className="flex select-none items-center justify-center gap-3"
    >
      <img src="/logo.webp" className="w-14" alt="Logo" />
      <span className="base-gradient bg-gradient-to-r bg-clip-text text-lg font-bold text-transparent">
        AMiN <br /> STORE
      </span>
    </Link>
  );
}

export default Logo;
