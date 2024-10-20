import UserPanelContainer from "../UserPanelContainer";
import { useAllComments } from "./useAllComments";
import AdminPanelCommentBox from "./AdminPanelCommentBox";
import { Skeleton } from "@mui/material";
import LoadMoreButton from "../../../ui/LoadMoreButton";
import { useInView } from "react-intersection-observer";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";

const SKELETON_COUNT = 9;

function AdminPanelComments() {
  const {
    commentPage,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useAllComments();
  const { ref, inView } = useInView();

  useInfiniteScroll({ fetchNextPage, inView });

  if (isLoading) {
    return (
      <UserPanelContainer>
        <div className="grid grid-cols-1 gap-6 vxs:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4">
          {Array(SKELETON_COUNT)
            .fill(0)
            .map((_, index) => {
              return (
                <Skeleton
                  key={`comment-skeleton-${index}`}
                  className="!rounded-xl"
                  variant="rounded"
                  animation="wave"
                  height={381}
                />
              );
            })}
        </div>
      </UserPanelContainer>
    );
  }

  return (
    <UserPanelContainer>
      <div className="grid grid-cols-1 gap-6 vxs:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4">
        {commentPage.map((comments) => {
          return comments.map((comment) => {
            return (
              <AdminPanelCommentBox
                key={`comment-${comment.id}`}
                comment={comment}
              />
            );
          });
        })}
        {hasNextPage && (
          <div
            className="col-span-1 flex w-full justify-center vxs:col-span-2 sm:col-span-3 xl:col-span-4"
            ref={ref}
          >
            <LoadMoreButton
              fetchNextPage={fetchNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          </div>
        )}
      </div>
    </UserPanelContainer>
  );
}

export default AdminPanelComments;
