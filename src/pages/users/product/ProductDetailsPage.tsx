import Navbar from "@/components/Navbar";
import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { db } from "../../../firebaseConfig";

interface Product {
  id: string;
  name: string;
  images: string[];
  price: number;
  category: string;
  description: string;
  brand?: string;
  SKU?: string;
  stock?: number;
  dimensions?: string;
  color?: string;
  themeImage?: string; // Added field for theme image
}

const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedThemeImage, setSelectedThemeImage] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchProduct = async () => {
      if (productId) {
        try {
          const productRef = doc(db, "products", productId);
          const productSnapshot = await getDoc(productRef);

          if (productSnapshot.exists()) {
            const productData = productSnapshot.data() as Omit<Product, "id">;

            setProduct({
              id: productSnapshot.id,
              ...productData,
            });
            setSelectedImage(productData.images[0]); // Set the first image as selected initially
            if (productData.themeImage) {
              setSelectedThemeImage(productData.themeImage); // Set theme image if available
            }
          } else {
            console.error("No such document!");
          }
        } catch (error) {
          console.error("Error fetching product: ", error);
        }
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = async () => {
    if (!product) return;

    const auth = getAuth();
    const userId = auth.currentUser?.uid;

    if (!userId) {
      alert("You must be logged in to add items to the cart.");
      return;
    }

    const cartRef = doc(db, "carts", userId);

    try {
      const cartSnapshot = await getDoc(cartRef);
      let cartData = cartSnapshot.exists()
        ? cartSnapshot.data()
        : { items: [] };

      // Check if item already exists in the cart
      const existingItemIndex = cartData.items.findIndex(
        (item: any) => item.id === product.id
      );

      if (existingItemIndex !== -1) {
        // Update quantity if item exists
        cartData.items[existingItemIndex].quantity += quantity;
      } else {
        // Add new item to the cart
        cartData.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: quantity,
        });
      }

      // Update cart in Firestore
      await setDoc(cartRef, cartData);

      alert(`Added ${quantity} item(s) to cart!`);
    } catch (error) {
      console.error("Error adding to cart: ", error);
    }
  };

  const handleBuyNow = () => {
    alert("Proceeding to checkout...");
  };

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-gray-600 text-lg">Loading...</div>
      </div>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-20 mt-12">
        <div className="flex flex-col md:flex-row items-start">
          {/* Image Gallery */}
          <div className="w-full md:w-1/2 lg:w-2/3">
            <div className="relative">
              {/* Main Image */}
              <div className="relative mb-4">
                <img
                  src={selectedThemeImage || selectedImage || product.images[0]}
                  alt="Main Product Image"
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
              </div>
              {/* Thumbnail Previews */}
              <div className="flex overflow-x-auto space-x-2 py-2">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className={`w-24 h-24 cursor-pointer object-cover rounded-lg border ${
                      selectedImage === image
                        ? "border-blue-500"
                        : "border-gray-300"
                    }`}
                    onClick={() => setSelectedImage(image)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="mt-6 md:mt-0 md:ml-8 w-full md:w-1/2 lg:w-1/3">
            <h1 className="text-4xl font-semibold text-gray-800 mb-4">
              {product.name}
            </h1>
            <p className="text-3xl font-bold text-gray-900 mb-4">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-gray-700 mb-6">{product.description}</p>
            {product.brand && (
              <p className="text-gray-600 mb-4">
                <span className="font-semibold">Brand:</span> {product.brand}
              </p>
            )}
            {product.SKU && (
              <p className="text-gray-600 mb-4">
                <span className="font-semibold">SKU:</span> {product.SKU}
              </p>
            )}
            {product.stock !== undefined && (
              <p className="text-gray-600 mb-4">
                <span className="font-semibold">Stock:</span> {product.stock}
              </p>
            )}
            {product.dimensions && (
              <p className="text-gray-600 mb-4">
                <span className="font-semibold">Dimensions:</span>{" "}
                {product.dimensions}
              </p>
            )}
            {product.color && (
              <p className="text-gray-600 mb-4">
                <span className="font-semibold">Color:</span> {product.color}
              </p>
            )}
            {product.themeImage && (
              <div className="mb-6">
                <label className="text-gray-600 mr-4">Theme Image:</label>
                <img
                  src={product.themeImage}
                  alt="Theme Image"
                  className="w-24 h-24 object-cover rounded-lg border border-gray-300 cursor-pointer"
                  onClick={() =>
                    setSelectedThemeImage(product.themeImage || "")
                  } // Ensure it's a string
                />
              </div>
            )}
            <div className="flex items-center mb-6">
              <label className="text-gray-600 mr-4">Quantity:</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-24 text-center border border-gray-300 rounded-lg p-2"
                min="1"
              />
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                className="bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 transition duration-300"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Product Description
          </h2>
          <p className="text-gray-700">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
