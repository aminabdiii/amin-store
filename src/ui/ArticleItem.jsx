import { Link } from "react-router-dom";

function ArticleItem({ article }) {
  const { image, title, id } = article;

  return (
    <div className="group overflow-hidden rounded-md border bg-white text-[13px] font-semibold leading-6 shadow">
      <Link to={`/detailsArticle?id=${id}`}>
        <div className="relative">
          <img src={image} alt={title} />
          <div className="invisible absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100">
            <span className="block scale-0 rounded-sm bg-white/20 p-3 text-xl text-white ring ring-white transition-all duration-200 group-hover:scale-100">
              Reading now
            </span>
          </div>
        </div>
        <div className="bg-white p-2">
          <p className="!line-clamp-2 text-xs leading-6 xs:text-sm xs:leading-8">
            {title}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default ArticleItem;
