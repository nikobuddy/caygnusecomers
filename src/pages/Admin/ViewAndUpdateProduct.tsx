import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";

interface Product {
  id: string;
  name: string;
  images: string[];
  price: number;
  image: string;
  category: string;
  description: string;
  brand: string;
  SKU: string;
  stock: number;
  dimensions: string;
  color: string;
}

const ManageProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsSnapshot = await getDocs(collection(db, "products"));
      const productsList = productsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Product, "id">), // Ensure 'id' is not included in the spread
      }));
      setProducts(productsList);
    };

    fetchProducts();
  }, []);

  const handleEditClick = (product: Product) => {
    setEditingProductId(product.id);
    setCurrentProduct(product);
  };

  const handleUpdateProduct = async () => {
    if (!currentProduct || !editingProductId) return;

    const productDoc = doc(db, "products", editingProductId);
    await updateDoc(productDoc, { ...currentProduct });
    alert("Product updated successfully!");

    // Refresh the product list
    const productsSnapshot = await getDocs(collection(db, "products"));
    const productsList = productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Product, "id">), // Ensure 'id' is not included in the spread
    }));
    setProducts(productsList);

    setEditingProductId(null);
    setCurrentProduct(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (currentProduct) {
      setCurrentProduct({
        ...currentProduct,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Manage Products
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-lg rounded-lg p-6 mb-6"
          >
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              {product.name}
            </h2>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover mb-4"
            />
            <p>
              <strong>Price:</strong> ${product.price.toFixed(2)}
            </p>
            <p>
              <strong>Category:</strong> {product.category}
            </p>
            <p>
              <strong>Description:</strong> {product.description}
            </p>
            <p>
              <strong>Brand:</strong> {product.brand}
            </p>
            <p>
              <strong>SKU:</strong> {product.SKU}
            </p>
            <p>
              <strong>Stock:</strong> {product.stock}
            </p>
            <p>
              <strong>Dimensions:</strong> {product.dimensions}
            </p>
            <p>
              <strong>Color:</strong> {product.color}
            </p>
            <button
              onClick={() => handleEditClick(product)}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-600 transition duration-200"
            >
              Edit
            </button>
          </div>
        ))}

        {editingProductId && currentProduct && (
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-blue-600 mb-6">
              Update Product Details
            </h2>
            <input
              type="text"
              name="name"
              value={currentProduct.name}
              onChange={handleInputChange}
              placeholder="Product Name"
              className="p-3 border border-gray-300 rounded-lg mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {currentProduct.images.map((image, index) => (
              <input
                key={index}
                type="text"
                name={`images_${index}`}
                value={image}
                onChange={(e) => {
                  const updatedImages = [...currentProduct.images];
                  updatedImages[index] = e.target.value;
                  setCurrentProduct({
                    ...currentProduct,
                    images: updatedImages,
                  });
                }}
                placeholder={`Product Image URL ${index + 1}`}
                className="p-3 border border-gray-300 rounded-lg mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            ))}
            <input
              type="number"
              name="price"
              value={currentProduct.price}
              onChange={handleInputChange}
              placeholder="Product Price"
              className="p-3 border border-gray-300 rounded-lg mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              name="image"
              value={currentProduct.image}
              onChange={handleInputChange}
              placeholder="Product Image URL"
              className="p-2 border rounded mb-4 w-full"
            />
            <input
              type="text"
              name="description"
              value={currentProduct.description}
              onChange={handleInputChange}
              placeholder="Product Description"
              className="p-3 border border-gray-300 rounded-lg mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              name="brand"
              value={currentProduct.brand}
              onChange={handleInputChange}
              placeholder="Product Brand"
              className="p-3 border border-gray-300 rounded-lg mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              name="SKU"
              value={currentProduct.SKU}
              onChange={handleInputChange}
              placeholder="Product SKU"
              className="p-3 border border-gray-300 rounded-lg mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="number"
              name="stock"
              value={currentProduct.stock}
              onChange={handleInputChange}
              placeholder="Product Stock"
              className="p-3 border border-gray-300 rounded-lg mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              name="dimensions"
              value={currentProduct.dimensions}
              onChange={handleInputChange}
              placeholder="Product Dimensions"
              className="p-3 border border-gray-300 rounded-lg mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              name="color"
              value={currentProduct.color}
              onChange={handleInputChange}
              placeholder="Product Color"
              className="p-3 border border-gray-300 rounded-lg mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleUpdateProduct}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-600 transition duration-200"
            >
              Update Product
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageProducts;
