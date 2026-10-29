import { Star } from "@mui/icons-material";
import MediaImage from "../../ui/MediaImage";

function Comments({ comments }) {
  if (!comments?.length) return null;

  return (
    <div className="flex flex-col gap-5 md:w-1/2">
      {comments.map((comment) => {
        if (!comment.approved) return null;
        return (
          <div
            key={comment.id}
            className="flex flex-col gap-2.5 rounded-xl bg-gray-100 p-4"
          >
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-3.5">
                <div className="h-16 w-16 overflow-hidden rounded-full">
                  <MediaImage
                    src={comment.user?.avatarUrl}
                    className="h-full w-full"
                    alt={comment.user?.fullName}
                    kind="avatar"
                  />
                </div>
                <div className="space-y-1">
                  <h4 className="font-medium">{comment.user?.fullName}</h4>
                  <p className="text-sm font-medium text-neutral-500">
                    {comment.createdAt
                      .slice(0, 10)
                      .split("-")
                      .reverse()
                      .join("/")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-0.5 font-bold text-violet-500">
                <span>
                  <Star />
                </span>
                <span>{comment.rating}</span>
              </div>
            </div>
            <div>
              <p className="min-h-28 text-pretty break-words text-sm leading-6 text-gray-900 sm:text-base sm:leading-7">
                {comment.content}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Comments;
