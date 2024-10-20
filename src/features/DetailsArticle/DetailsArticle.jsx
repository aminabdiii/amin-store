import { Skeleton } from "@mui/material";
import { useDetailsArticle } from "./useDetailsArticle";

import "/src/Styles/ckEditor.css";
import { Share } from "@mui/icons-material";

const SKELETON_COUNT = 5;

function DetailsArticle() {
  const { detailsArticle, isLoading } = useDetailsArticle();

  if (isLoading) {
    return (
      <div className="mx-auto flex max-w-5xl flex-col gap-5 bg-white p-5">
        {Array(SKELETON_COUNT)
          .fill("articleSkeleton")
          .map((item, index) => (
            <div key={`${index}-${item}`} className="flex flex-col gap-4">
              <Skeleton variant="rounded" animation="wave" height={50} />
              <Skeleton variant="rounded" animation="wave" />
              <Skeleton variant="rounded" animation="wave" />
              <Skeleton variant="rounded" animation="wave" />
              <Skeleton variant="rounded" animation="wave" />
              <Skeleton variant="rounded" animation="wave" width="50%" />
            </div>
          ))}
      </div>
    );
  }

  const { title, content, image } = detailsArticle;

  const handleShare = () => {
    navigator.share({ title, url: location.href });
  };

  return (
    <div
      className="relative mx-auto flex max-w-6xl flex-col gap-5 bg-white p-5"
      id="container"
    >
      <div className="mb-5">
        <img className="mx-auto rounded-3xl" src={image} alt={title} />
      </div>
      <h1 className="text-3xl font-semibold leading-10 md:text-4xl">{title}</h1>

      <div
        className="ck-content mx-auto flex max-w-5xl flex-col gap-5 break-words bg-white"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      <button
        onClick={handleShare}
        className="fixed bottom-4 left-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 text-3xl text-white transition-colors hover:bg-blue-600"
        title="share this article"
      >
        <Share fontSize="inherit" />
      </button>
    </div>
  );
}

export default DetailsArticle;
