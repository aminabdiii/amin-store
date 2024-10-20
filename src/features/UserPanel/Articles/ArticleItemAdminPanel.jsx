import { HiPencil } from "react-icons/hi2";
import { Link } from "react-router-dom";

function ArticleItemAdminPanel({ article, setEditArticleId }) {
  const { id, image, title } = article;

  return (
    <div key={id} className="overflow-hidden rounded-lg border shadow">
      <Link to={`/detailsArticle?id=${id}`} target="_blank">
        <img src={image} alt={title} />
      </Link>
      <div className="p-2">
        <Link
          to={`/detailsArticle?id=${id}`}
          target="_blank"
          className="line-clamp-3 h-[60px] text-sm font-medium"
        >
          {title}
        </Link>
      </div>
      <div>
        <button
          onClick={() => setEditArticleId(id)}
          className="flex w-full items-center justify-center gap-1 border-t bg-violet-500 p-0.5 font-semibold uppercase text-white"
        >
          <HiPencil />
          edit
        </button>
      </div>
    </div>
  );
}

export default ArticleItemAdminPanel;
