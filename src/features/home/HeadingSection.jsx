import { HiOutlineArrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";

function HeadingSection({ title, buttonTextContent, path }) {
  return (
    <section className="flex flex-wrap items-center justify-between gap-4 py-4">
      <div className="flex flex-col gap-2">
        <div className="relative flex items-center">
          <h3 className="pl-3 text-sm font-semibold capitalize tracking-wide xxs:text-base xs:pl-5 xs:text-xl sm:text-2xl">
            {title}
          </h3>
          <span className="base-gradient absolute -left-2 h-3 w-3 bg-gradient-to-br xs:h-5 xs:w-5"></span>
        </div>
      </div>
      <div>
        <Link
          to={path}
          className="flex items-center gap-1 p-2 text-xs font-medium uppercase text-violet-500 vxs:text-sm xs:text-base"
        >
          {buttonTextContent ? (
            <>
              {buttonTextContent}
              <HiOutlineArrowRight className="pt-0.5" />
            </>
          ) : (
            ""
          )}
        </Link>
      </div>
    </section>
  );
}

export default HeadingSection;
