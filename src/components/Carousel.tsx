import  { useEffect } from "react";
import { getData } from "../context/DataContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Category from "./Category";
import { Link, useNavigate } from "react-router-dom";


const Carousel = () =>{
  const navigate = useNavigate();
  const context = getData();
  if(!context){
    throw new Error("Carousel must be used with in dataprovider")
  }

  const {data, fetchAllProducts} = context;
  console.log(data)

  useEffect(()=>{
    fetchAllProducts()
  },[])


    var settings = {
    dots: false,
    autoplay:true,
    autoplaySpeed:2000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover:false,
  };


    return(
      <>
      <Slider {...settings}>
        {
          data?.slice(0,7)?.map((item:any,index:number)=>{
              return <div key={index} className="bg-linear-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] -z-10">
                <div className="flex flex-col md:flex-row gap-10 justify-center h-[500px] my-25 md:my-0 items-center px-4 ">
                  <div className="md:space-y-6 space-y-3">
                    <h3 className="text-red-500 font-semibold font-sans text-sm">Powering Your World with the Best Products</h3>
                    <h1 className="md:text-4xl text-xl font-bold uppercase md:line-clamp-3 line-clamp-2 md:w-[550px] text-white" >{item.title}</h1>
                    <p className="md:w-[500px] line-clamp-3 text-gray-400 pr-7">{item.description}</p>
                      <button onClick={()=>navigate(`/products/${item.id}`)} className="bg-linear-to-r from-red-500 to-purple-500 text-white px-3 py-2 rounded-md cursor-pointer mt-2">Shop Now</button>
                    
                  </div>
                  <div>
                    <img src={item.images} alt={item.title} className="rounded-full w-[400px] hover:scale-105 transition-all shadow-2xl shadow-red-400 "/>
                  </div>
                </div>
              </div>
          })
        }
        
      </Slider>
      <Category/>

      </>
    )
}

export default Carousel