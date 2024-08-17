import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebaseConfig";

interface Product {
  name: string;
  images: string[];
  price: number;
  description: string;
  brand: string;
  SKU: string;
  stock: number;
  dimensions: string;
  color: string;
  category: string;
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsSnapshot = await getDocs(collection(db, "products"));
      const productsData = productsSnapshot.docs.map(
        (doc) => doc.data() as Product
      );
      setProducts(productsData);
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Products
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-6">
            <img
              src={product.images[0] || "placeholder-image-url"}
              alt={product.name}
              className="w-full h-64 object-cover mb-4 rounded"
            />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {product.name}
            </h2>
            <p className="text-lg text-gray-600 mb-4">${product.price}</p>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-600 transition duration-200"
              onClick={() => alert(`Buy Now: ${product.name}`)}
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
