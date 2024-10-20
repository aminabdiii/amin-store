import { CircularProgress } from "@mui/material";
import { HiMiniArrowPathRoundedSquare } from "react-icons/hi2";

function UploadImageSection({ avatarUrlPath, isUploading, register }) {
  return (
    <div className="pb-6">
      <div className="relative flex h-28 w-28 vxs:h-32 vxs:w-32">
        <img
          src={avatarUrlPath || "/user.jpeg"}
          className="w-full rounded-full ring-2 ring-violet-500"
          alt="user"
        />
        {isUploading && (
          <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-white/50 text-gray-400">
            <CircularProgress size={81} color="inherit" />
          </div>
        )}
        <span className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-violet-500 text-white vxs:h-10 vxs:w-10">
          <HiMiniArrowPathRoundedSquare size={20} />
          <input
            type="file"
            {...register}
            className="absolute inset-0 w-full rounded-full bg-transparent !text-transparent opacity-0"
          />
        </span>
      </div>
    </div>
  );
}

export default UploadImageSection;
