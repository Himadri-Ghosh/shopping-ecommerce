import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../assets/src_assets_Loading4.webm";
import Breadcrums from "../components/Breadcrums";
import { IoCartOutline } from "react-icons/io5";
import { useCart } from "../context/CartContext";

const SingleProduct = () => {
  const params = useParams();
  const [singleProduct, setsingleProduct] = useState<any>();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState<number>(1);

  const getSingleProduct = async () => {
    try {
      const res = await axios.get(
        `https://api.escuelajs.co/api/v1/products/${params.id}`
      );
      const product = res.data;
      console.log(product);
      setsingleProduct(product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  let discount = Math.floor(Math.random() * 10) + 1;
  // const originalPrice = Math.round(singleProduct.price + (singleProduct.price * discount / 100));

  return (
    <>
      {singleProduct ? (
        <div className="px-4 pb-4 md:px-0">
          <Breadcrums title={singleProduct.title} />
          <div className="max-w-6xl mx-auto md:p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Product Image */}
            <div className="w-full">
              <img
                src={singleProduct.images}
                alt={singleProduct.title}
                className="rounded-2xl w-full object-cover"
              />
            </div>
            {/* Product Details */}
            <div className="flex flex-col gap-6">
              <h1 className="md:text-3xl text-xl font-bold text-gray-800 ">
                {singleProduct.title}
              </h1>
              <div className="text-gray-700">
                {singleProduct.slug?.toUpperCase()} /{" "}
                {singleProduct.category.name?.toUpperCase()}
              </div>
              <p className="text-xl text-red-500 font-bold">
                ${singleProduct.price}{" "}
                <span className="line-through text-gray-700">
                  $
                  {Math.round(
                    singleProduct.price + (singleProduct.price * discount) / 100
                  )}
                </span>{" "}
                <span className="bg-red-500 text-white p-3 rounded-3xl">
                  {discount}% discount
                </span>
              </p>
              <p className="text-gray-600 ">{singleProduct.description}</p>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-gray-700 ">
                  Quantity:
                </label>
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-20 border border-gray-300 rounded-lg px--3 py-1 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => addToCart(singleProduct)}
                  className="px-6 flex gap-2 py-2 text-lg bg-red-500 text-white rounded-md cursor-pointer"
                >
                  <IoCartOutline className="w-6 h-6" /> Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <video muted autoPlay loop>
            <source src={Loading} />
          </video>
        </div>
      )}
    </>
  );
};

export default SingleProduct;
