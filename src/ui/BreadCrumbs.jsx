import { Breadcrumbs } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";

function BreadCrumbs({ title, category }) {
  const breadCrumbsElements = [
    <Link key="1" to="/" className="underline-offset-2 hover:underline">
      home
    </Link>,
    <Link
      key="2"
      to={`/products/${category}`}
      className="underline-offset-2 hover:underline"
    >
      {category}
    </Link>,
    title && <span key="3">{title}</span>,
  ];
  return (
    <Breadcrumbs
      className="!font-montserrat !text-xs !font-medium capitalize 360:!text-sm vxs:!text-base xs:!text-lg"
      separator={
        <NavigateNextIcon fontSize="medium" className="!text-violet-500" />
      }
      aria-label="breadcrumb"
    >
      {breadCrumbsElements}
    </Breadcrumbs>
  );
}

export default BreadCrumbs;
