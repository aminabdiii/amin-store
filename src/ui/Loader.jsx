import { LinearProgress } from "@mui/material";

function Loader() {
  return (
    <div className="flex h-[50vh] w-full items-center justify-center">
      <LinearProgress color="secondary" className="w-full" />
    </div>
  );
}

export default Loader;
