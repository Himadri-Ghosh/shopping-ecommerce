import { createContext, useContext, useState } from "react";
import axios from "axios";

export const DataContext = createContext<any>(null);


export const DataProvider = ({children}:any) =>{
  const[data, setData] = useState<any[]>([]);

  // fetching all products from api

  const fetchAllProducts = async()=>{
    try{
      const res = await axios.get("https://api.escuelajs.co/api/v1/products")
      const productsData = res.data;
      setData(productsData)

    } catch (error){
      console.log(error);
    }
  }

  const getUniqueCatagory = (data: any[], property: string) =>{
      let newVal =data?.map((currElem:any)=>{
        return currElem[property]
      })
      newVal = [...new Set(newVal)]
       return newVal;
  }

  const categoryOnlyData = getUniqueCatagory(data, "category")

  const categoryData = ["All",...getUniqueCatagory(categoryOnlyData, 'name')];

  return(
    <>
        <DataContext.Provider value={{data, setData, fetchAllProducts, categoryData}}>
            {children}
        </DataContext.Provider>
    </>
  )
}


export const getData = ()=> useContext(DataContext)