import React from "react";
import { getData } from "../context/DataContext";

const FilterSection = ({
  search,
  setSearch,
  priceRange,
  setPriceRange,
  category,
  handleCategoryChange,
  handleReset,
}: any) => {
  const { categoryData } = getData();

  return (
    <>
      <div className="bg-gray-100 mt-10 p-4 rounded-md h-max hidden md:block">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white p-2 rounded-md border-gray-400 border-2"
        />

        {/* Category only data */}
        <h1 className="mt-5 font-semibold text-xl">Category</h1>
        <div className="flex flex-col gap-2 mt-3 ">
          {categoryData?.map((item: any, index: number) => {
            return (
              <div key={index} className="flex gap-2">
                <input
                  type="checkbox"
                  name={item}
                  checked={category === item}
                  value={item}
                  onChange={handleCategoryChange}
                />
                <button className="cursor-pointer uppercase">{item}</button>
              </div>
            );
          })}
        </div>
        {/* Price Range */}
        <h1 className="mt-5 font-semibold text-xl">Price Range</h1>
        <div className="flex flex-col gap-2 ">
          <label>
            Price Range: ${priceRange[0]} - ${priceRange[1]}
          </label>
          <input
            type="range"
            min="0"
            max="5000"
            value={priceRange[1]}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPriceRange([priceRange[0], Number(e.target.value)])
            }
          />
        </div>
        <button
          className="bg-red-500 text-white rounded-md px-3 py-1 mt-5 cursor-pointer"
          onClick={handleReset}
        >
          Reset Filters
        </button>
      </div>
    </>
  );
};

export default FilterSection;
