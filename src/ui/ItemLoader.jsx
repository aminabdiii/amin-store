import { CircularProgress } from "@mui/material";

function ItemLoader() {
  return (
    <div className="flex justify-center">
      <CircularProgress className="!flex !justify-center" />
    </div>
  );
}

export default ItemLoader;
