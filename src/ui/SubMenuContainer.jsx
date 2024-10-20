import { Skeleton } from "@mui/material";
import { useCategories } from "../hooks/useCategories";
import Loader from "./Loader";
import SubMenuItem from "./SubMenuItem";

function SubMenuContainer() {
  const { categories, isLoading } = useCategories();
  return (
    <div className="invisible absolute -right-48 top-[50.2px] -z-10 h-auto w-auto translate-y-5 overflow-hidden rounded-b-2xl border border-b-4 border-b-violet-500 bg-white opacity-0 shadow-xl group-hover:visible group-hover:z-10 group-hover:translate-y-0 group-hover:opacity-100 group-hover:transition-all">
      {isLoading ? (
        <Skeleton height={480} width={455} variant="rounded" animation="wave" />
      ) : (
        <ul className="grid w-full min-w-[30rem] grid-cols-2 text-xs">
          {categories.length > 0 &&
            categories.map((subMenu) => {
              return <SubMenuItem key={subMenu.id} subMenu={subMenu} />;
            })}
        </ul>
      )}
    </div>
  );
}

export default SubMenuContainer;
