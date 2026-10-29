import QueryError from "../../ui/QueryError";
import { Skeleton } from "@mui/material";
import FeatureItem from "./FeatureItem";
import HeadingSection from "./HeadingSection";
import { useFeatures } from "./useFeatures";

function Features() {
  const { features = [], isLoading, error, refetch } = useFeatures();

  return (
    <div>
      <HeadingSection title="why buy from us?" />
      {error && <QueryError onRetry={refetch} />}
      {isLoading && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <Skeleton
            variant="rounded"
            animation="wave"
            className="!h-[114px] sm:!h-[305px]"
          />
          <Skeleton
            variant="rounded"
            animation="wave"
            className="!h-[114px] sm:!h-[305px]"
          />
          <Skeleton
            variant="rounded"
            animation="wave"
            className="!h-[114px] sm:!h-[305px]"
          />
          <Skeleton
            variant="rounded"
            animation="wave"
            className="!h-[114px] sm:!h-[305px]"
          />
        </div>
      )}
      {!isLoading && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {features.length > 0 &&
            features.map((feature) => {
              return <FeatureItem key={feature.id} feature={feature} />;
            })}
        </div>
      )}
    </div>
  );
}

export default Features;
