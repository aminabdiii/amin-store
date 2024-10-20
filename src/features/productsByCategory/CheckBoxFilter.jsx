import { Switch } from "@mui/material";
import { useSearchParams } from "react-router-dom";

function CheckBoxFilter({ title, className, filterParam }) {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div
      className={`flex h-16 w-full items-center justify-between rounded-md bg-white px-5 font-semibold max-md:h-24 ${className}`}
    >
      <div className="max-md:text-xl max-vxs:text-lg">
        <span>{title}</span>
      </div>
      <div className="max-md:scale-125">
        <Switch
          color="primary"
          defaultChecked={searchParams.has(filterParam)}
          onChange={(event) => {
            if (event.target.checked) {
              searchParams.set(filterParam, true);
              setSearchParams(searchParams);
            } else {
              searchParams.delete(filterParam);
              setSearchParams(searchParams);
            }
          }}
        />
      </div>
    </div>
  );
}

export default CheckBoxFilter;
