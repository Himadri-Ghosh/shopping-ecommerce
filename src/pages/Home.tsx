import { useEffect } from "react";
import Carousel from "../components/Carousel";
import MidBanner from "../components/MidBanner";
import Features from "../components/Features";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="overflow-x-hidden">
        <Carousel />
        <MidBanner />
        <Features />
      </div>
    </>
  );
};

export default Home;
