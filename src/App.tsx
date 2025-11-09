import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import axios from "axios";
import Footer from "./components/Footer";
import SingleProduct from "./pages/SingleProduct";
import CategoryProduct from "./pages/CategoryProduct";
import { CartProvider } from "./context/CartContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Chatbot from "./components/ChatBot";

const App = () => {
  const [location, setLocation] = useState<any>();
  const [openDropdown, setOpenDropdown] = useState(false);

  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      console.log(latitude, longitude);

      const url = `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=690ec70ee429f749696631vkc70f635`;
      try {
        const location = await axios.get(url);
        const exactLocation = location.data.address;
        setLocation(exactLocation);
        setOpenDropdown(false);
        console.log(exactLocation);
      } catch (error) {
        console.log(error);
      }
    });
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <>
      <CartProvider>
        <BrowserRouter>
          <Navbar
            location={location}
            getLocation={getLocation}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
          />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/products" element={<Product />}></Route>
            <Route path="/products/:id" element={<SingleProduct />}></Route>
            <Route path="/category/:id" element={<CategoryProduct />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart location={location} getLocation={getLocation} />
                </ProtectedRoute>
              }
            ></Route>
          </Routes>
          <Footer />
        </BrowserRouter>
        <Chatbot />
      </CartProvider>
    </>
  );
};

export default App;
