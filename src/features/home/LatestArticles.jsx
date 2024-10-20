import { useLatestArticles } from "../Articles/useLatestArticles";
import { Skeleton } from "@mui/material";

import HeadingSection from "./HeadingSection";
import ArticleItem from "../../ui/ArticleItem";

const SKELETON_COUNT = 6;

function LatestArticles() {
  const { latestArticles, isLoading } = useLatestArticles();
  return (
    <div className="pt-5">
      <HeadingSection
        title="Latest Articles"
        buttonTextContent="more articles"
        path="/articles"
      />
      {isLoading && (
        <div className="my-5 grid grid-cols-1 gap-6 xs:grid-cols-2 850:grid-cols-3">
          {Array(SKELETON_COUNT)
            .fill(0)
            .map((_, index) => {
              return (
                <Skeleton
                  key={`latest_article_skeleton_${index}`}
                  variant="rounded"
                  animation="wave"
                  className="!h-[240px] vxs:!h-[300px] xs:!h-[240px] 850:!h-[300px]"
                />
              );
            })}
        </div>
      )}
      {!isLoading && (
        <div className="my-5 grid grid-cols-1 gap-6 xs:grid-cols-2 850:grid-cols-3">
          {latestArticles.length &&
            latestArticles.map((article) => {
              return <ArticleItem key={article.id} article={article} />;
            })}
        </div>
      )}
    </div>
  );
}

export default LatestArticles;
