import { useDispatch } from "react-redux";
import { setSearchQuery } from "../features/todoSlice";
import { Searchicon } from "../icons/search";

const SearchBar = () => {
  const dispatch = useDispatch();

  return (
    <div className="relative w-full flex items-center border-2 rounded mr-4">
      <input
        type="text"
        placeholder="Search by task names"
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        className="w-full p-2 focus:outline-none placeholder:font-bold"
      />
      <Searchicon className=""/>
    </div>
  );
};

export default SearchBar;
