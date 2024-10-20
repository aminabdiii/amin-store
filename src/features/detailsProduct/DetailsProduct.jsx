import { useDetailsProduct } from "./useDetailsProduct";
import { useGetUser } from "../../hooks/useGetUser";
import { useGetCommentsByProductId } from "./useGetCommentsByProductId";

import BreadCrumbs from "../../ui/BreadCrumbs";
import ThumbSwiper from "./ThumbSwiper";
import InformationSection from "./InformationSection";
import CommentForm from "./CommentForm";
import Comments from "./Comments";
import Container from "../../ui/Container";
import { Skeleton } from "@mui/material";
import RelatedProducts from "./RelatedProducts";

function DetailsProduct() {
  const { product, isLoading } = useDetailsProduct();
  const { user, isLoading: isUserLoading } = useGetUser();
  const { comments, isLoading: isGettingComments } =
    useGetCommentsByProductId();

  const loading = isLoading || isUserLoading || isGettingComments;

  if (loading) {
    return (
      <Container>
        <Skeleton variant="rounded" animation="wave" />
        <div className="my-5 flex flex-col items-center gap-8 border-b-2 px-5 pb-5 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-3">
            <Skeleton
              className="!h-72 !w-72 xxs:!h-80 xxs:!w-80 vxs:!h-96 vxs:!w-96"
              variant="rounded"
              animation="wave"
            />
            <div className="grid !w-72 grid-cols-4 gap-3 xxs:!w-80 vxs:!w-96">
              <Skeleton variant="rounded" animation="wave" height={71} />
              <Skeleton variant="rounded" animation="wave" height={71} />
              <Skeleton variant="rounded" animation="wave" height={71} />
              <Skeleton variant="rounded" animation="wave" height={71} />
            </div>
          </div>
          <div className="flex h-full w-full flex-col gap-5 md:flex-grow md:justify-between md:gap-6">
            <div className="space-y-3">
              <Skeleton variant="rounded" animation="wave" />
              <Skeleton variant="rounded" animation="wave" width={"50%"} />
              <Skeleton variant="rounded" animation="wave" width={"70%"} />
            </div>
            <Skeleton
              variant="rounded"
              animation="wave"
              height={32}
              width={123}
            />
            <div className="grid w-full grid-cols-1 gap-5 450:grid-cols-2 md:grid-cols-1 md:gap-6 lg:grid-cols-2">
              <Skeleton variant="rounded" animation="wave" height={40} />
              <Skeleton variant="rounded" animation="wave" height={40} />
            </div>
            <Skeleton
              variant="rounded"
              animation="wave"
              className="!max-h-44 md:!min-h-48"
            />
            <div className="grid grid-cols-1 gap-3 vxs:grid-cols-2 md:grid-cols-1 850:grid-cols-2">
              <Skeleton variant="rounded" animation="wave" height={36.5} />
              <Skeleton variant="rounded" animation="wave" height={36.5} />
            </div>
          </div>
        </div>
        <section className="flex w-full flex-col gap-5 md:w-1/2">
          <Skeleton
            variant="rounded"
            height={28}
            width={150}
            animation="wave"
          />

          <div className="flex flex-col items-center gap-5 py-5">
            <div className="flex w-full items-center justify-between">
              <Skeleton
                variant="rounded"
                height={24}
                width={58}
                animation="wave"
              />
              <Skeleton
                variant="rounded"
                height={30}
                width={150}
                animation="wave"
              />
            </div>
            <div className="w-full">
              <Skeleton animation="wave" variant="rounded" height={224} />
            </div>
            <div className="flex items-center gap-5">
              <Skeleton
                variant="rounded"
                animation="wave"
                width={96}
                height={49}
              />
              <Skeleton
                variant="rounded"
                animation="wave"
                width={96}
                height={49}
              />
            </div>
          </div>
        </section>
      </Container>
    );
  }

  const { title, category, id } = product;

  return (
    <Container>
      <BreadCrumbs title={title} category={category} />

      <section className="my-5 flex flex-col items-center gap-8 border-b-2 pb-5 md:flex-row md:items-start md:justify-between">
        <ThumbSwiper product={product} />
        <InformationSection product={product} userId={user?.id} />
      </section>

      <>
        <CommentForm user={user} commentsLength={comments.length} />
        <Comments comments={comments} />
      </>
      <>
        <RelatedProducts category={category} expectProductId={id} />
      </>
    </Container>
  );
}

export default DetailsProduct;
