import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";

const AddCategories: React.FC = () => {
  const [newCategory, setNewCategory] = useState<string>("");
  const [productName, setProductName] = useState<string>("");
  const [productImage, setProductImage] = useState<string>("");
  const [productImages, setProductImages] = useState<string[]>([""]); // Initial with one empty string
  const [productPrice, setProductPrice] = useState<number>(0);
  const [productCategory, setProductCategory] = useState<string>("");
  const [productDescription, setProductDescription] = useState<string>("");
  const [productBrand, setProductBrand] = useState<string>("");
  const [productSKU, setProductSKU] = useState<string>("");
  const [productStock, setProductStock] = useState<number>(0);
  const [productDimensions, setProductDimensions] = useState<string>("");
  const [productColor, setProductColor] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesSnapshot = await getDocs(collection(db, "categories"));
      const categoriesData = categoriesSnapshot.docs.map(
        (doc) => doc.data().name as string
      );
      setCategories(categoriesData);
    };

    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    if (!newCategory) return;

    await addDoc(collection(db, "categories"), { name: newCategory });
    setNewCategory("");
    alert("Category added successfully!");

    // Refresh the categories list
    const categoriesSnapshot = await getDocs(collection(db, "categories"));
    const categoriesData = categoriesSnapshot.docs.map(
      (doc) => doc.data().name as string
    );
    setCategories(categoriesData);
  };

  const handleAddProduct = async () => {
    if (
      !productName ||
      !productImages.length ||
      !productCategory ||
      productPrice <= 0 ||
      !productImage ||
      !productDescription ||
      !productBrand ||
      !productSKU ||
      productStock < 0
    )
      return;

    await addDoc(collection(db, "products"), {
      name: productName,
      images: productImages,
      price: productPrice,
      image: productImage,
      category: productCategory,
      description: productDescription,
      brand: productBrand,
      SKU: productSKU,
      stock: productStock,
      dimensions: productDimensions,
      color: productColor,
    });

    // Clear form
    setProductName("");
    setProductImages([""]);
    setProductPrice(0);
    setProductCategory("");
    setProductDescription("");
    setProductImage("");
    setProductBrand("");
    setProductSKU("");
    setProductStock(0);
    setProductDimensions("");
    setProductColor("");
    alert("Product added successfully!");
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...productImages];
    newImages[index] = value;
    setProductImages(newImages);
  };

  const addImageField = () => {
    setProductImages([...productImages, ""]);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Add New Category Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-orange-600 mb-6">
            Add New Category
          </h2>
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Enter new category name"
            className="p-3 border border-gray-300 rounded-lg mb-6 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <button
            onClick={handleAddCategory}
            className="bg-orange-500 text-white py-2 px-4 rounded-lg w-full hover:bg-orange-600 transition duration-200"
          >
            Add Category
          </button>
        </div>

        {/* Add New Product Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-blue-600 mb-6">
            Add New Product
          </h2>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Product Name"
            className="p-3 border border-gray-300 rounded-lg mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {productImages.map((image, index) => (
            <input
              key={index}
              type="text"
              value={image}
              onChange={(e) => handleImageChange(index, e.target.value)}
              placeholder={`Product Image URL ${index + 1}`}
              className="p-3 border border-gray-300 rounded-lg mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          ))}
          <button
            onClick={addImageField}
            className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg w-full hover:bg-gray-300 transition duration-200"
          >
            Add Another Image
          </button>
          <input
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(parseFloat(e.target.value))}
            placeholder="Product Price"
            className="p-3 border border-gray-300 rounded-lg mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            value={productImage}
            onChange={(e) => setProductImage(e.target.value)}
            placeholder="Product Image URL"
            className="p-2 border rounded mb-4 w-full"
          />
          <input
            type="text"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            placeholder="Product Description"
            className="p-3 border border-gray-300 rounded-lg mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            value={productBrand}
            onChange={(e) => setProductBrand(e.target.value)}
            placeholder="Product Brand"
            className="p-3 border border-gray-300 rounded-lg mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            value={productSKU}
            onChange={(e) => setProductSKU(e.target.value)}
            placeholder="Product SKU"
            className="p-3 border border-gray-300 rounded-lg mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            value={productStock}
            onChange={(e) => setProductStock(parseInt(e.target.value))}
            placeholder="Product Stock"
            className="p-3 border border-gray-300 rounded-lg mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            value={productDimensions}
            onChange={(e) => setProductDimensions(e.target.value)}
            placeholder="Product Dimensions"
            className="p-3 border border-gray-300 rounded-lg mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            value={productColor}
            onChange={(e) => setProductColor(e.target.value)}
            placeholder="Product Color"
            className="p-3 border border-gray-300 rounded-lg mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <select
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg mb-6 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddProduct}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-600 transition duration-200"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategories;
