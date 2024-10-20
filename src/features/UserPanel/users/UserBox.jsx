import { HiOutlineTrash } from "react-icons/hi2";
import { useDeleteUser } from "./useDeleteUser";
import Swal from "sweetalert2";

function UserBox({ user }) {
  const { deleteUser } = useDeleteUser();
  const { created_at } = user;

  const { id, avatar, fullName, userName } = user.user_metadata;
  function handleDeleteUser() {
    Swal.fire({
      icon: "warning",
      title: `are you sure for delete "${fullName}" user?`,
      showDenyButton: true,
      confirmButtonText: "yes",
    }).then((result) => {
      if (result.isConfirmed) deleteUser({ userId: user.id });
    });
  }

  return (
    <div key={user.id} className="flex flex-col gap-2 rounded-[27px] bg-white">
      <>
        <div className="flex items-center justify-center">
          <div className="flex h-44 w-full items-center justify-center border-b">
            <img
              className="h-28 w-28 rounded-full sm:h-36 sm:w-36"
              src={avatar || "/user.jpeg"}
              alt={fullName}
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
              title={`${created_at.slice(11, 19)} UTC`}
            >
              {created_at.slice(0, 10).split("-").reverse().join("/")}
            </span>
          </div>
        </div>
      </>
      <>
        <div className="flex flex-col gap-2 p-2 text-sm">
          <button
            onClick={handleDeleteUser}
            className="flex items-center justify-center gap-1 rounded-[27px] border border-red-500 p-0.5 font-semibold uppercase text-red-500 transition-all duration-300 hover:bg-red-500 hover:text-white"
          >
            <HiOutlineTrash /> delete
          </button>
        </div>
      </>
    </div>
  );
}

export default UserBox;
