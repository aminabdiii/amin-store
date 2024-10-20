import { Search } from "@mui/icons-material";
import { useState } from "react";
import { HiXMark } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";

function SearchBox({ className }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("s") || "");

  function onSearch(event) {
    event.preventDefault();

    searchParams.set("s", search);
    setSearchParams(searchParams);
  }
  function onEmptySearch(event) {
    event.preventDefault();

    setSearch("");
    searchParams.delete("s");
    setSearchParams(searchParams);
  }

  return (
    <form
      onSubmit={onSearch}
      className={`relative flex items-center ${className}`}
    >
      <input
        type="text"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="products"
        className="h-full w-full rounded-md border p-5 pl-12 font-medium shadow shadow-gray-300 outline-none"
      />
      <button className="absolute left-0 h-full p-3" type="submit">
        <Search />
      </button>
      {(search.length > 0 || searchParams.has("s")) && (
        <button className="absolute right-0 p-3" onClick={onEmptySearch}>
          <HiXMark />
        </button>
      )}
    </form>
  );
}

export default SearchBox;
