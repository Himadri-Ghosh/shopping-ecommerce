import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-20">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-8">
        <h1 className="text-4xl font-bold text-center">About ShOppinG</h1>

        <p className="text-gray-700 text-lg">
          Welcome to{" "}
          <span className="font-semibold text-red-600">ShOppinG</span> — your
          trusted online destination for quality products at great prices. From
          fashion and home essentials to the latest gadgets, we’re here to make
          online shopping simple, enjoyable, and affordable for everyone.
        </p>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-red-600">Our Mission</h2>
          <p className="text-gray-700 text-base">
            At ShOppinG, our mission is to bring convenience and value to your
            shopping experience. We aim to provide customers with top-quality
            products, secure payments, and quick delivery — all while keeping
            customer satisfaction at the heart of everything we do.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-red-600">
            Why Choose ShOppinG?
          </h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Wide range of categories with trusted brands</li>
            <li>Fast, secure, and reliable delivery</li>
            <li>Dedicated support team ready to assist you</li>
            <li>Easy returns and smooth shopping experience</li>
          </ul>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-red-600">Our Vision</h2>
          <p className="text-gray-700 text-base">
            We believe shopping should be simple, transparent, and accessible to
            all. Our vision is to become a one-stop platform where every
            customer finds exactly what they need — with confidence, comfort,
            and a smile.
          </p>
        </div>

        <div className="text-center mt-10">
          <h3 className="text-xl font-semibold text-red-600 mb-2">
            Be Part of the ShOppinG Family
          </h3>
          <p className="text-gray-700 mb-4">
            Whether you’re looking for everyday essentials or something special,
            <span className="font-semibold"> ShOppinG </span> is here to make
            your online shopping journey effortless and fun.
          </p>
          <Link to="/products">
            <button className="bg-red-600 text-white px-6 py-2 rounded-xl hover:bg-red-700 transition duration-300 cursor-pointer">
              Start Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
