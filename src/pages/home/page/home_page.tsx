import Navbar from "@/components/Navbar";
import Banners from "@/pages/users/banner/banners";
import CategoryPage from "@/pages/users/product/CategoryPage";
import React from "react";

const Homepage: React.FC = () => {
  return (
    <div className="w-full py-20">
      <Navbar />
      <Banners />
      <CategoryPage />
    </div>
  );
};

export default Homepage;
