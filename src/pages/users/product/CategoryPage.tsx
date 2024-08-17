import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../../firebaseConfig";

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
}

const CategoryPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [categories, setCategories] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>("default");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        const productsSnapshot = await getDocs(collection(db, "products"));
        const categoriesSnapshot = await getDocs(collection(db, "categories"));

        const productsData = productsSnapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as Product)
        );
        const categoriesData = categoriesSnapshot.docs.map(
          (doc) => doc.data().name as string
        );

        console.log("Products Data:", productsData); // Debugging line
        console.log("Categories Data:", categoriesData); // Debugging line

        setProducts(productsData);
        setCategories(["All", ...categoriesData]);
      } catch (error) {
        console.error("Error fetching products or categories:", error);
      }
    };

    fetchProductsAndCategories();
  }, []);

  const filteredProducts = products.filter((product) =>
    selectedCategory === "All" ? true : product.category === selectedCategory
  );

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOption === "low-to-high") {
      return a.price - b.price;
    } else if (sortOption === "high-to-low") {
      return b.price - a.price;
    } else {
      return 0;
    }
  });

  const handleViewDetails = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-12">Our Products</h1>

      <div className="flex justify-end mb-8">
        <div className="w-full md:w-1/3 lg:w-1/4 space-y-4">
          <div className="relative">
            <select
              className="block appearance-none w-full bg-white border border-gray-300 rounded-lg shadow-md py-3 px-4 pr-8 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                <path d="M10 12l-8-8h16l-8 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {sortedProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover rounded-t-lg"
              onError={(e) =>
                (e.currentTarget.src = "/path/to/placeholder-image.jpg")
              } // Fallback image
            />
            <div className="p-5">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {product.name}
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                ${product.price.toFixed(2)}
              </p>
              <button
                onClick={() => handleViewDetails(product.id)}
                className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition w-full"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
