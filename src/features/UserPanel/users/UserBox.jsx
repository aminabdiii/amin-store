import { HiOutlineTrash } from "react-icons/hi2";
import { useDeleteUser } from "./useDeleteUser";
import { showDialog } from "../../../ui/dialogs/dialogService";
import MediaImage from "../../../ui/MediaImage";

function UserBox({ user }) {
  const { deleteUser } = useDeleteUser();
  const { createdAt } = user;

  const { avatar, fullName, username: userName, active } = user;
  function handleDeleteUser() {
    showDialog({
      status: "warning",
      title: `Disable the account for ${fullName}?`,
      confirmation: true,
      destructive: true,
      confirmLabel: "Disable account",
    }).then((result) => {
      if (result) deleteUser({ userId: user.id });
    });
  }

  return (
    <div key={user.id} className="flex flex-col gap-2 rounded-[27px] bg-white">
      <>
        <div className="flex items-center justify-center">
          <div className="flex h-44 w-full items-center justify-center border-b">
            <MediaImage
              className="h-28 w-28 rounded-full sm:h-36 sm:w-36"
              src={avatar?.url}
              alt={fullName}
              kind="avatar"
            />
          </div>
        </div>
      </>
      <>
        <div className="flex w-full flex-col gap-2 pb-4">
          <div className="flex items-center justify-center gap-1">
            <h4
              className="text-center font-semibold"
              title={`userName: ${userName}`}
            >
              {fullName}
            </h4>
          </div>
          <div className="flex items-center justify-center gap-1">
            <span
              className="text-center text-sm text-neutral-500"
              title={`${createdAt.slice(11, 19)} UTC`}
            >
              {createdAt.slice(0, 10).split("-").reverse().join("/")}
            </span>
          </div>
        </div>
      </>
      <>
        <div className="flex flex-col gap-2 p-2 text-sm">
          <button
            onClick={handleDeleteUser}
            disabled={!active}
            className="flex items-center justify-center gap-1 rounded-[27px] border border-red-500 p-0.5 font-semibold uppercase text-red-500 transition-all duration-300 hover:bg-red-500 hover:text-white"
          >
            <HiOutlineTrash /> {active ? "Disable account" : "Disabled"}
          </button>
        </div>
      </>
    </div>
  );
}

export default UserBox;
