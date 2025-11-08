
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

type Info={ cartItem: any[]; setCartItem: React.Dispatch<React.SetStateAction<any[]>>; addToCart: (product: any) => void; updateQuantity: (productId: number, newQuantity: number, action: string) => void; removeFromCart: (productId: number) => void; }

export const CartContext = createContext<Info | null>(null)


export const CartProvider=({children}:any)=>{
  const [cartItem, setCartItem] = useState<any[]>(()=>{
    const storedCart = localStorage.getItem('cartItem');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  //Load cart from local storage on initial render
      useEffect(() => {
        const storedCart = localStorage.getItem('cartItem')
        if(storedCart){
          setCartItem(JSON.parse(storedCart))
        }
      }, []);

      // Save cart to localStorage whenever it changes
          useEffect(() => {
          localStorage.setItem("cartItem", JSON.stringify(cartItem));
          }, [cartItem]);


  const addToCart = (product:any) =>{
    const itemInCart = cartItem.find((item)=> item.id === product.id);
    if(itemInCart){
      // Increase quantity if already in cart
      const updatedCart = cartItem.map((item)=>{
        return item.id === product.id ? {...item, quantity: item.quantity + 1} : item
      })
      setCartItem(updatedCart);
      toast.success("Product quantity increased!")
    }else{
      // Add new item with quantity 1
      setCartItem([...cartItem, {...product, quantity: 1}]);
      toast.success("Product is added to cart!")
    }
    
  }

  const removeFromCart =(productId:number)=>{
      setCartItem(cartItem.filter(item => item.id != productId))
      toast.success("Product is deleted from the cart!")
  }

  const updateQuantity = (productId:number, newQuantity:number, action:string) =>{
    if(newQuantity <= 0){
      removeFromCart(productId);
      return;
    }
    const updateCart = cartItem.map(item => item.id === productId ? {...item, quantity:newQuantity} : item);
    setCartItem(updateCart);
    if(action === "increase"){
      toast.success("Quantity increased!");
    }else if(action === "decrease"){
      toast.success("Quantity decreased!");
    }
  }

  return <CartContext.Provider value={{cartItem, setCartItem, addToCart, updateQuantity, removeFromCart}}>
      {children}
  </CartContext.Provider>
}

export const useCart = () => useContext(CartContext);