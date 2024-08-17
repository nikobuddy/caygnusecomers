// pages/ProductManagement.tsx
import { addDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";

interface Product {
  id?: string;
  name: string;
  price: number;
}

const ProductManagement = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({ name: "", price: 0 });

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];
      setProducts(productsList);
    };

    fetchProducts();
  }, []);

  const addProduct = async () => {
    await addDoc(collection(db, "products"), newProduct);
    setNewProduct({ name: "", price: 0 });
    const querySnapshot = await getDocs(collection(db, "products"));
    const productsList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];
    setProducts(productsList);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product Management</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Product Name"
          className="border p-2 rounded mr-2"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Price"
          className="border p-2 rounded mr-2"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })
          }
        />
        <button
          onClick={addProduct}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add Product
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
        <thead>
          <tr>
            <th className="p-2 border-b">Name</th>
            <th className="p-2 border-b">Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="p-2 border-b">{product.name}</td>
              <td className="p-2 border-b">${product.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManagement;
