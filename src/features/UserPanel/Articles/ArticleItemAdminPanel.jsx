import { articlePath } from "../../../routing/paths";
import { HiPencil } from "react-icons/hi2";
import { Link } from "react-router-dom";
import MediaImage from "../../../ui/MediaImage";

function ArticleItemAdminPanel({ article, setEditArticleId }) {
  const { id, title } = article;
  const image = article.image?.url ?? article.image;

  return (
    <div key={id} className="overflow-hidden rounded-lg border shadow">
      <Link to={articlePath(id)} target="_blank">
        <MediaImage src={image} alt={title} kind="article" className="w-full" />
      </Link>
      <div className="p-2">
        <Link
          to={articlePath(id)}
          target="_blank"
          className="line-clamp-2 h-10 text-sm font-medium leading-5"
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
