import Order from "./Order";
import Empty from "../../../ui/Empty";
import UserPanelContainer from "../UserPanelContainer";
import LoadMoreButton from "../../../ui/LoadMoreButton";
import { useInView } from "react-intersection-observer";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import { useGetUserPurchases } from "./useGetUserPurchases";
import { Skeleton } from "@mui/material";
import _ from "lodash";

const SKELETON_NUMBER = 4;

function Purchases() {
  const {
    purchasePages,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useGetUserPurchases();
  const { ref, inView } = useInView();

  useInfiniteScroll({ fetchNextPage, inView });

  if (isLoading) {
    return (
      <UserPanelContainer>
        <div className="flex flex-col gap-6">
          {Array(SKELETON_NUMBER)
            .fill(0)
            .map((_, index) => {
              return (
                <Skeleton
                  key={`skeleton-${index}`}
                  variant="rounded"
                  animation="wave"
                  className="!h-[305px] !rounded-[27px] xs:!h-60"
                />
              );
            })}
        </div>
      </UserPanelContainer>
    );
  }
  const isHavePurchases = _.reduce(
    purchasePages,
    (acc, item) => acc + item.length,
    0,
  );

  return (
    <UserPanelContainer>
      <div className="flex flex-col gap-6">
        {purchasePages.map((allPurchasePerPage) => {
          return allPurchasePerPage.map((purchaseItem) => {
            return <Order key={purchaseItem.id} purchaseItem={purchaseItem} />;
          });
        })}
        {!isHavePurchases && <Empty title={"You have not made a purchase."} />}
        {hasNextPage && (
          <div ref={ref} className="flex w-full justify-center">
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

export default Purchases;
