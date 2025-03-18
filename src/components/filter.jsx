import { useDispatch } from "react-redux";
import { setFilter } from "../features/todoSlice";
import { useState } from "react";
import { Filtericon } from "../icons/fliter";

const filterOptions = ["All","Completed", "Incomplete", "Personal","Work","Family", "Household", "Others"];

const Filter = () => {
  const dispatch = useDispatch();
  const [selectedFilters, setSelectedFilters] = useState(["All"]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleFilter = (filter) => {
    let updatedFilters;
    if (selectedFilters.includes(filter)) {
      updatedFilters = selectedFilters.filter((f) => f !== filter);
    } else {
      updatedFilters = [...selectedFilters, filter];
    }

    setSelectedFilters(updatedFilters);
    dispatch(setFilter(updatedFilters.join(" ")));
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setDropdownOpen(!dropdownOpen)} 
        className="border-2 px-4 py-2 rounded  cursor-pointer"
      >
        <span className="flex items-center text-zinc-700 font-bold gap-2">Filters <Filtericon/></span>
      </button>

      {dropdownOpen && (
        <div className="absolute mt-2 w-48 bg-white border rounded shadow-lg z-5">
          {filterOptions.map((filter) => (
            <label key={filter} className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200">
              <input 
                type="checkbox" 
                checked={selectedFilters.includes(filter)}
                onChange={() => toggleFilter(filter)}
                className="mr-2"
              />
              {filter}
            </label>
          ))}
        </div>
      )}

    </div>
  );
};

export default Filter;
