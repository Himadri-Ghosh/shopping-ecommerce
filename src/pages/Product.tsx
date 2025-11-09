import React, { useEffect, useState } from "react";
import { getData } from "../context/DataContext";
import FilterSection from "../components/FilterSection";
import Loading from "../assets/src_assets_Loading4.webm";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import Lottie from "lottie-react";
import empty from "../assets/empty.json";
import MobileFilter from "../components/MobileFilter";

const Product = () => {
  const { data, fetchAllProducts } = getData();
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("All");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [page, setPage] = useState<number>(1);
  const [openFilter, setOpenFilter] = useState<boolean>(false);

  useEffect(() => {
    fetchAllProducts();
    window.scrollTo(0, 0);
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCategory(e.target.value);
      setPage(1);
      setOpenFilter(false);
    } else {
      setCategory("All");
    }
  };

  const filterData = data?.filter((item: any) => {
    return (
      item.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || item.category.name === category) &&
      item.price >= priceRange[0] &&
      item.price <= priceRange[1]
    );
  });

  const handleReset = () => {
    setSearch("");
    setCategory("All");
    setPriceRange([0, 5000]);
  };

  const pageHandeler = (selectedPage: number) => {
    setPage(selectedPage);
    window.scrollTo(0, 0);
  };

  const dynamicPage = Math.ceil(filterData?.length / 8);

  return (
    <div>
      <div className="max-w-6xl mx-auto px-4 mb-10">
        <MobileFilter
          openFilter={openFilter}
          setOpenFilter={setOpenFilter}
          search={search}
          setSearch={setSearch}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          category={category}
          handleCategoryChange={handleCategoryChange}
          handleReset={handleReset}
        />
        {data?.length > 0 ? (
          <>
            <div className="flex gap-8 ">
              <FilterSection
                search={search}
                setSearch={setSearch}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                category={category}
                handleCategoryChange={handleCategoryChange}
                handleReset={handleReset}
              />
              {filterData.length > 0 ? (
                <div className="flex flex-col justify-center items-center">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-7 mt-10">
                    {filterData
                      .slice(page * 8 - 8, page * 8)
                      .map((product: any, index: number) => {
                        return <ProductCard key={index} product={product} />;
                      })}
                  </div>
                  <Pagination
                    pageHandeler={pageHandeler}
                    page={page}
                    dynamicPage={dynamicPage}
                  />
                </div>
              ) : (
                <div className="flex justify-center items-center md:h-[500px] md:w-[550px] mt-10 ml-40">
                  <Lottie animationData={empty} />
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-[400px]">
            <video muted autoPlay loop>
              <source src={Loading} />
            </video>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
