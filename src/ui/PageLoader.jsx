import { HashLoader } from "react-spinners";

function PageLoader() {
  return (
    <div className="absolute inset-0 flex h-dvh w-full items-center justify-center bg-white text-violet-500">
      {/* <CircularProgress color="inherit" size={100} /> */}

      <HashLoader size={100} />
    </div>
  );
}

export default PageLoader;
