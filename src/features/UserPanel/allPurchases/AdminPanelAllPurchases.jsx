import { Skeleton } from "@mui/material";
import UserPanelContainer from "../UserPanelContainer";
import { useAllPurchases } from "./useAllPurchases";
import Order from "../purchases/Order";
import { useDeliveryPurchase } from "./useDeliveryPurchase";
import LoadMoreButton from "../../../ui/LoadMoreButton";
import { useInView } from "react-intersection-observer";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";

const SKELETON_NUMBER = 4;

function AdminPanelAllPurchases() {
  const { pages, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useAllPurchases();
  const { deliveryPurchase } = useDeliveryPurchase();
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

  return (
    <UserPanelContainer>
      <div className="flex flex-col gap-6">
        {pages.map((allProductsPerPage) => {
          return allProductsPerPage.map((purchaseItem) => {
            return (
              <Order
                deliveryPurchase={deliveryPurchase}
                key={purchaseItem.id}
                purchaseItem={purchaseItem}
                type="admin"
              />
            );
          });
        })}
        {hasNextPage && (
          <div className="flex w-full justify-center" ref={ref}>
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

export default AdminPanelAllPurchases;
