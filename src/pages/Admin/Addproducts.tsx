import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";

const AdminPagecategres: React.FC = () => {
  const [newCategory, setNewCategory] = useState<string>("");
  const [productName, setProductName] = useState<string>("");
  const [productImage, setProductImage] = useState<string>("");
  const [productPrice, setProductPrice] = useState<number>(0);
  const [productCategory, setProductCategory] = useState<string>("");
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
    if (!productName || !productImage || !productCategory || productPrice <= 0)
      return;

    await addDoc(collection(db, "products"), {
      name: productName,
      image: productImage,
      price: productPrice,
      category: productCategory,
    });

    setProductName("");
    setProductImage("");
    setProductPrice(0);
    setProductCategory("");
    alert("Product added successfully!");
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Add New Category</h2>
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Enter new category name"
            className="p-2 border rounded mb-4 w-full"
          />
          <button
            onClick={handleAddCategory}
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition w-full"
          >
            Add Category
          </button>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Product Name"
            className="p-2 border rounded mb-4 w-full"
          />
          <input
            type="text"
            value={productImage}
            onChange={(e) => setProductImage(e.target.value)}
            placeholder="Product Image URL"
            className="p-2 border rounded mb-4 w-full"
          />
          <input
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(parseFloat(e.target.value))}
            placeholder="Product Price"
            className="p-2 border rounded mb-4 w-full"
          />
          <select
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            className="p-2 border rounded mb-4 w-full"
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
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition w-full"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPagecategres;
