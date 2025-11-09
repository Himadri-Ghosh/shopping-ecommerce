import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Category=()=>{
  
  const [categories,setCategories] = useState<any[]>([]);
  const navigate = useNavigate();

  const fetchCategory = async () =>{
    try {
      const res = await axios.get(`https://api.escuelajs.co/api/v1/categories`)
      console.log(res.data);
      setCategories(res.data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchCategory();
  },[])

  return (

    <>
      <div className='bg-[#101829]'>
          <div className='max-w-7xl mx-auto flex flex-wrap gap-4 items-center justify-center md:justify-around py-7 px-4 '>
            {

              categories?.map((item:any, index:number)=>{
                return <div key={index}>
                    <button onClick={()=>navigate(`/category/${item.id}`)} className='uppercase bg-linear-to-r from-red-500 to-purple-500 text-white px-2 py-1 rounded-md cursor-pointer'>{item.name}</button>
                </div>
              })
            }
          </div>
      </div>
    </>  
  )
}

export default Category