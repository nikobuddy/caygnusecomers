import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";

const CouponsAdminPage: React.FC = () => {
  const [couponCode, setCouponCode] = useState<string>("");
  const [couponLimit, setCouponLimit] = useState<number>(0);
  const [newUsersOnly, setNewUsersOnly] = useState<boolean>(false);
  const [coupons, setCoupons] = useState<any[]>([]);
  const [editingCoupon, setEditingCoupon] = useState<any | null>(null);
  const [updatedLimit, setUpdatedLimit] = useState<number>(0);

  const fetchCoupons = async () => {
    const couponsSnapshot = await getDocs(collection(db, "coupons"));
    const couponsData = couponsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setCoupons(couponsData);
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleAddCoupon = async () => {
    if (!couponCode || couponLimit <= 0) return;

    await addDoc(collection(db, "coupons"), {
      code: couponCode,
      limit: couponLimit,
      newUsersOnly: newUsersOnly,
      used: 0,
    });

    setCouponCode("");
    setCouponLimit(0);
    setNewUsersOnly(false);
    alert("Coupon added successfully!");
    fetchCoupons(); // Refresh the coupon list
  };

  const handleUpdateCoupon = async (id: string) => {
    const couponRef = doc(db, "coupons", id);
    await updateDoc(couponRef, { limit: updatedLimit });
    alert("Coupon updated successfully!");
    setEditingCoupon(null);
    setUpdatedLimit(0);
    fetchCoupons(); // Refresh the coupon list
  };

  const startEditing = (coupon: any) => {
    setEditingCoupon(coupon);
    setUpdatedLimit(coupon.limit);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Add New Coupon Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-green-600 mb-6">
            Add New Coupon
          </h2>
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Coupon Code"
            className="p-3 border border-gray-300 rounded-lg mb-4 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="number"
            value={couponLimit}
            onChange={(e) => setCouponLimit(parseInt(e.target.value))}
            placeholder="Usage Limit"
            className="p-3 border border-gray-300 rounded-lg mb-4 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <label className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={newUsersOnly}
              onChange={(e) => setNewUsersOnly(e.target.checked)}
              className="mr-2"
            />
            Applicable for new users only
          </label>
          <button
            onClick={handleAddCoupon}
            className="bg-green-500 text-white py-2 px-4 rounded-lg w-full hover:bg-green-600 transition duration-200"
          >
            Add Coupon
          </button>
        </div>

        {/* Manage Existing Coupons Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-purple-600 mb-6">
            Manage Existing Coupons
          </h2>
          <ul>
            {coupons.map((coupon) => (
              <li
                key={coupon.id}
                className="mb-4 border-b border-gray-200 pb-4"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-semibold text-gray-800">
                      {coupon.code}
                    </p>
                    <p className="text-gray-600">Limit: {coupon.limit}</p>
                    <p className="text-gray-600">Used: {coupon.used}</p>
                  </div>
                  <button
                    onClick={() => startEditing(coupon)}
                    className="bg-yellow-500 text-white py-1 px-4 rounded-lg hover:bg-yellow-600 transition duration-200"
                  >
                    Edit
                  </button>
                </div>
                {editingCoupon?.id === coupon.id && (
                  <div className="mt-4">
                    <input
                      type="number"
                      value={updatedLimit}
                      onChange={(e) =>
                        setUpdatedLimit(parseInt(e.target.value))
                      }
                      placeholder="New Usage Limit"
                      className="p-3 border border-gray-300 rounded-lg mb-4 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                    <button
                      onClick={() => handleUpdateCoupon(coupon.id)}
                      className="bg-yellow-500 text-white py-2 px-4 rounded-lg w-full hover:bg-yellow-600 transition duration-200"
                    >
                      Update Coupon
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CouponsAdminPage;
