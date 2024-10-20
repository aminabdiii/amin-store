import { Skeleton } from "@mui/material";
import { useArticles } from "../features/Articles/useArticles.js";
import Container from "../ui/Container.jsx";

import ArticleItem from "../ui/ArticleItem";
import PageTitle from "../ui/PageTitle.jsx";

const SKELETON_COUNT = 6;

function Articles() {
  const { articles, isLoading } = useArticles();

  if (isLoading) {
    return (
      <Container>
        <div className="my-5 grid grid-cols-1 gap-6 xs:grid-cols-2 850:grid-cols-3 xl:grid-cols-4">
          {Array(SKELETON_COUNT)
            .fill(0)
            .map((_, index) => {
              return (
                <Skeleton
                  key={`article_skeleton_${index}`}
                  variant="rounded"
                  animation="wave"
                  className="!h-[240px] vxs:!h-[300px] xs:!h-[240px] 850:!h-[300px]"
                />
              );
            })}
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <PageTitle length={articles.length} categoryType="article" />

      <div className="my-5 grid grid-cols-1 gap-6 xs:grid-cols-2 850:grid-cols-3 xl:grid-cols-4">
        {articles.map((article) => {
          return <ArticleItem key={article.id} article={article} />;
        })}
      </div>
    </Container>
  );
}

export default Articles;
