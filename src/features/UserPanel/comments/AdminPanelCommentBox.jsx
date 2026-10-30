import { productPath } from "../../../routing/paths";
import { HiArchiveBox, HiCheckBadge, HiEye, HiTrash } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { showDialog } from "../../../ui/dialogs/dialogService";
import MediaImage from "../../../ui/MediaImage";
import { useConfirmUserComment } from "./useConfirmUserComment";
import { useDeleteComment } from "./useDeleteComment";

function AdminPanelCommentBox({
  comment: { user, productId, approved: isConfirm, content, id },
}) {
  const userName = user?.fullName;
  const useravatar = user?.avatarUrl;
  const { confirmComment } = useConfirmUserComment();
  const { deleteComment } = useDeleteComment();

  function handleShowCommentContent() {
    showDialog({
      title: userName,
      description: content,
    });
  }
  function handleConfirmComment() {
    if (isConfirm) return;
    showDialog({
      title: "Are you sure about confirming this comment?",
      status: "question",
      confirmation: true,
      confirmLabel: "Approve comment",
    }).then((result) => {
      if (result) {
        confirmComment({ id });
      }
    });
  }
  function handleDeleteComment() {
    showDialog({
      title: "Are you sure about deleting the desired comment ?",
      status: "warning",
      confirmation: true,
      destructive: true,
      confirmLabel: "Delete comment",
    }).then((result) => {
      if (result) {
        deleteComment({ id });
      }
    });
  }

  return (
    <div className="relative flex flex-col items-center gap-3 rounded-xl bg-white p-3">
      <div className="relative h-40 w-40 overflow-hidden rounded-full">
        <MediaImage
          className="h-full w-full"
          src={useravatar}
          alt={userName}
          kind="avatar"
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
          to={productPath(productId)}
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
