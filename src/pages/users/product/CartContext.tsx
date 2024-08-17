import Navbar from "@/components/Navbar";
import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebaseConfig";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Coupon {
  id: string;
  code: string;
  discount: number; // Assuming discount is a percentage
  newUsersOnly: boolean;
  used: number;
  limit: number;
}

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [coupon, setCoupon] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);
  const [shippingCost, setShippingCost] = useState<number>(0);
  const [refresh, setRefresh] = useState<boolean>(false);
  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    const fetchCart = async () => {
      if (!userId) return;

      const cartRef = doc(db, "carts", userId);
      try {
        const cartSnapshot = await getDoc(cartRef);
        if (cartSnapshot.exists()) {
          const cartData = cartSnapshot.data();
          if (cartData && Array.isArray(cartData.items)) {
            setCartItems(cartData.items);
            const totalPrice = cartData.items.reduce(
              (acc: number, item: CartItem) => acc + item.price * item.quantity,
              0
            );
            setTotal(totalPrice);
          }
        }
      } catch (error) {
        console.error("Error fetching cart: ", error);
      }
    };

    const fetchShippingCost = async () => {
      const shippingRef = doc(db, "config", "shipping");
      try {
        const shippingSnapshot = await getDoc(shippingRef);
        if (shippingSnapshot.exists()) {
          setShippingCost(shippingSnapshot.data().cost);
        }
      } catch (error) {
        console.error("Error fetching shipping cost: ", error);
      }
    };

    fetchCart();
    fetchShippingCost();
  }, [userId, refresh]);

  const handleQuantityChange = async (id: string, newQuantity: number) => {
    if (!userId) return;

    const cartRef = doc(db, "carts", userId);
    try {
      const cartSnapshot = await getDoc(cartRef);
      if (cartSnapshot.exists()) {
        const cartData = cartSnapshot.data();
        if (cartData && Array.isArray(cartData.items)) {
          const updatedItems = cartData.items.map((item: CartItem) =>
            item.id === id ? { ...item, quantity: newQuantity } : item
          );
          await updateDoc(cartRef, { items: updatedItems });
          setRefresh((prev) => !prev); // Toggle refresh state
        }
      }
    } catch (error) {
      console.error("Error updating quantity: ", error);
    }
  };

  const handleRemoveItem = async (id: string) => {
    if (!userId) return;

    const cartRef = doc(db, "carts", userId);
    try {
      const cartSnapshot = await getDoc(cartRef);
      if (cartSnapshot.exists()) {
        const cartData = cartSnapshot.data();
        if (cartData && Array.isArray(cartData.items)) {
          const updatedItems = cartData.items.filter(
            (item: CartItem) => item.id !== id
          );
          await updateDoc(cartRef, { items: updatedItems });
          setRefresh((prev) => !prev); // Toggle refresh state
        }
      }
    } catch (error) {
      console.error("Error removing item: ", error);
    }
  };

  const applyCoupon = async () => {
    const couponRef = collection(db, "coupons");
    try {
      const couponSnapshot = await getDocs(couponRef);
      const coupons: Coupon[] = couponSnapshot.docs.map((doc) => {
        const data = doc.data() as Omit<Coupon, "id">; // Exclude 'id' from data
        return {
          id: doc.id,
          ...data,
        };
      });

      const selectedCoupon = coupons.find((c) => c.code === coupon);

      if (selectedCoupon) {
        const isNewUser = true; // Implement your logic to check if the user is new
        if (selectedCoupon.newUsersOnly && !isNewUser) {
          alert("This coupon is only for new users.");
          return;
        }
        if (selectedCoupon.used >= selectedCoupon.limit) {
          alert("This coupon has reached its usage limit.");
          return;
        }
        const discountAmount = total * (selectedCoupon.discount / 100); // Using discount from coupon
        setDiscount(discountAmount);

        // Increment the usage count
        await updateDoc(doc(db, "coupons", selectedCoupon.id), {
          used: selectedCoupon.used + 1,
        });

        alert("Coupon applied successfully!");
      } else {
        setDiscount(0);
        alert("Invalid coupon code.");
      }
    } catch (error) {
      console.error("Error applying coupon: ", error);
    }
  };

  const finalTotal = total - discount + shippingCost;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Your Cart</h1>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {cartItems.length === 0 ? (
            <div className="p-6 text-center text-gray-600">
              <p>Your cart is empty.</p>
              <a href="/shop" className="text-blue-500 underline">
                Continue Shopping
              </a>
            </div>
          ) : (
            <div>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center border-b py-4 px-6 hover:bg-gray-50 transition duration-300"
                >
                  {/* Product Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg mr-4"
                  />
                  <div className="flex-grow">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {item.name}
                    </h2>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item.id,
                            Math.max(item.quantity - 1, 1)
                          )
                        }
                        className="bg-gray-300 text-gray-700 px-2 py-1 rounded-l-lg"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.id,
                            parseInt(e.target.value, 10)
                          )
                        }
                        className="w-12 text-center border border-gray-300 rounded-lg"
                      />
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                        className="bg-gray-300 text-gray-700 px-2 py-1 rounded-r-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-500 ml-4 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <div className="bg-gray-100 p-6 border-t">
                <div className="flex justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900">Subtotal</h2>
                  <span className="text-lg font-bold text-gray-900">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900">Shipping</h2>
                  <span className="text-lg font-bold text-gray-900">
                    ${shippingCost.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900">Discount</h2>
                  <span className="text-lg font-bold text-gray-900">
                    -${discount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Total</h2>
                  <span className="text-2xl font-bold text-gray-900">
                    ${finalTotal.toFixed(2)}
                  </span>
                </div>
                <div className="mb-6">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Enter coupon code"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />
                  <button
                    onClick={applyCoupon}
                    className="w-full mt-2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                  >
                    Apply Coupon
                  </button>
                </div>
                <div className="flex justify-between">
                  <a
                    href="/shop"
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
                  >
                    Continue Shopping
                  </a>
                  <a
                    href="/checkout"
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
                  >
                    Checkout
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
