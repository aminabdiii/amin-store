import { Link } from "react-router-dom";

function NotFound({ resetErrorBoundry = () => {} }) {
  return (
    <div className="base-gradient absolute inset-0 flex h-dvh flex-col items-center justify-center gap-6 bg-gradient-to-br px-5 uppercase">
      <img src="/404.webp" alt="404" className="w-[576px]" />
      <h1 className="text-2xl font-bold italic text-white vxs:text-3xl sm:text-5xl">
        page not found
      </h1>
      <Link
        to="/"
        onClick={resetErrorBoundry}
        className="flex items-center gap-2 rounded-xl border-2 bg-white/50 px-4 py-2 text-lg font-semibold uppercase text-black vxs:text-2xl"
      >
        <span>Try Again</span>
      </Link>
    </div>
  );
}

export default NotFound;
