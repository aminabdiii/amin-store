import { HiArchiveBox, HiCheckBadge, HiEye, HiTrash } from "react-icons/hi2";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useConfirmUserComment } from "./useConfirmUserComment";
import { useDeleteComment } from "./useDeleteComment";

function AdminPanelCommentBox({
  comment: { useravatar, userName, productId, isConfirm, content, id },
}) {
  const { confirmComment } = useConfirmUserComment();
  const { deleteComment } = useDeleteComment();

  function handleShowCommentContent() {
    Swal.fire({
      title: userName,
      text: content,
    });
  }
  function handleConfirmComment() {
    if (isConfirm) return;
    Swal.fire({
      title: "Are you sure about confirming this comment?",
      icon: "question",
      iconColor: "#22d3ee",
      showDenyButton: true,
      confirmButtonText: "yes",
    }).then((result) => {
      if (result.isConfirmed) {
        confirmComment({ id });
      }
    });
  }
  function handleDeleteComment() {
    Swal.fire({
      title: "Are you sure about deleting the desired comment ?",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "yes",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteComment({ id });
      }
    });
  }

  return (
    <div className="relative flex flex-col items-center gap-3 rounded-xl bg-white p-3">
      <div className="relative h-40 w-40 overflow-hidden rounded-full border-b pb-3">
        <img
          className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 rounded-xl"
          src={useravatar || "/user.jpeg"}
          alt={userName}
        />
      </div>
      <div>
        <h4 className="text-xl font-semibold">{userName}</h4>
      </div>
      <div className="grid w-full space-y-3">
        <button
          className="flex w-full items-center justify-center gap-1 rounded-xl bg-blue-400 p-1.5 font-semibold capitalize text-white focus:bg-blue-500"
          onClick={handleShowCommentContent}
        >
          <span>
            <HiEye size={20} />
          </span>
          <span>content</span>
        </button>
        <Link
          to={`/DetailsProduct?productId=${productId}`}
          target="_blank"
          className="flex w-full items-center justify-center gap-1 rounded-xl bg-violet-500 p-1.5 font-semibold capitalize text-white focus:bg-purple-500"
        >
          <span>
            <HiArchiveBox size={20} />
          </span>
          <span>Product</span>
        </Link>
        {isConfirm ? (
          <button
            disabled={true}
            className="flex w-full items-center justify-center gap-1 rounded-xl bg-gray-400 p-1.5 font-semibold capitalize text-white"
          >
            <span>confirmed</span>
          </button>
        ) : (
          <button
            className="flex w-full items-center justify-center gap-1 rounded-xl bg-green-400 p-1.5 font-semibold capitalize text-white"
            onClick={handleConfirmComment}
          >
            <span>
              <HiCheckBadge size={20} />
            </span>
            <span>confirm</span>
          </button>
        )}
      </div>

      <button
        onClick={handleDeleteComment}
        className="absolute left-2 top-2 flex h-12 w-12 items-center justify-center rounded-full bg-red-500 text-white sm:h-9 sm:w-9"
      >
        <HiTrash className="!h-7 !w-7 sm:!h-6 sm:!w-6" />
      </button>
    </div>
  );
}

export default AdminPanelCommentBox;
