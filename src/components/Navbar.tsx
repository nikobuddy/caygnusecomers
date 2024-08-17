import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  query as firestoreQuery,
  getDoc,
  getDocs,
  where,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { FaMapMarkerAlt, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { HiOutlineSearch } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useOnClickOutside } from "../components/useOnClickOutside";
import { auth, db } from "../firebaseConfig";
import Dropdown from "./Dropdown";
import AddressPopup from "./popup/AddressPopup";

interface User {
  uid: string;
  displayName?: string;
  email?: string;
  phoneNumber?: string;
}

interface Product {
  id: string;
  name: string;
  image: string;
}

const Navbar: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<number>(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  useOnClickOutside(dropdownRef, () => setIsDropdownOpen(false));

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser({
            uid: currentUser.uid,
            displayName: userData.username || "Username",
            email: currentUser.email || "",
            phoneNumber: currentUser.phoneNumber || "",
          });

          if (userData.addresses && userData.addresses.length > 0) {
            const address = `${userData.addresses[0].flatDetails || ""}, ${
              userData.addresses[0].areaDetails || ""
            }`;
            setAddress(address);
          } else {
            setAddress(null);
          }
        }

        const cartDoc = await getDoc(doc(db, "carts", currentUser.uid));
        if (cartDoc.exists()) {
          setCartItems(cartDoc.data().itemsCount || 0);
        }
      } else {
        setUser(null);
        setAddress(null);
        setCartItems(0);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAddAddressClick = () => {
    setIsPopupOpen(true);
  };

  const handleUserIconClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSearchChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    try {
      const productsRef = collection(db, "products");
      const productsQuery = firestoreQuery(
        productsRef,
        where("name", ">=", query),
        where("name", "<=", query + "\uf8ff")
      );
      const querySnapshot = await getDocs(productsQuery);
      const results = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];

      console.log("Search Results:", results); // Debugging line

      setSearchResults(results);
      setIsDropdownOpen(true);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
    setIsDropdownOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-orange-50 text-gray-800 py-2 px-4 shadow-md z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-3">
          <img
            src="/src/assets/tplogo.png"
            alt="Caygnus Logo"
            className="h-16 w-auto"
          />
          <span className="text-2xl font-semibold tracking-wide ml-3">
            Caygnus
          </span>
        </a>

        {/* Address & Search Bar */}
        <div className="flex flex-grow items-center space-x-6 ml-5">
          <div className="flex items-center space-x-3">
            {address ? (
              <button
                onClick={handleAddAddressClick}
                className="flex items-center space-x-2 text-sm bg-white bg-opacity-70 p-2 rounded-full border border-gray-300 shadow-sm transition duration-300 ease-in-out hover:bg-white"
              >
                <FaMapMarkerAlt className="text-orange-500 w-5 h-5" />
                <span className="truncate">{address}</span>
              </button>
            ) : (
              <button
                onClick={handleAddAddressClick}
                className="text-sm bg-orange-200 hover:bg-orange-300 text-orange-700 py-1 px-3 rounded-full shadow transition duration-300 ease-in-out"
              >
                Add Address
              </button>
            )}
          </div>

          <div className="flex-grow max-w-xl relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search for products..."
              className="w-full p-2 pl-10 rounded-full border-none bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />

            {/* Search Dropdown */}
            {isDropdownOpen && searchResults.length > 0 && (
              <div
                ref={dropdownRef}
                className="absolute z-50 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg"
              >
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleProductClick(product.id)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-full"
                    />
                    <span className="ml-3 text-gray-700">{product.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="flex items-center space-x-2">
              <FaUserCircle
                className="w-6 h-6 text-gray-700 cursor-pointer hover:text-orange-500"
                onClick={handleUserIconClick}
              />
              <span className="hidden lg:inline text-sm font-medium">
                {user ? (
                  <span
                    className="font-medium cursor-pointer"
                    onClick={handleUserIconClick}
                  >
                    Hey, {user.displayName || "Username"}
                  </span>
                ) : (
                  <span className="text-gray-500">Buddy!</span>
                )}
              </span>
            </div>

            {isDropdownOpen && user && (
              <Dropdown onClose={() => setIsDropdownOpen(false)} />
            )}
          </div>

          <a
            href="/orders"
            className="text-gray-700 hover:text-orange-500 text-sm font-medium"
          >
            Order
          </a>

          <a
            href="/cart"
            className="relative flex items-center text-gray-700 hover:text-orange-500"
          >
            <FaShoppingCart className="w-6 h-6" />
            {cartItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems}
              </span>
            )}
          </a>
        </div>
      </div>

      {/* Address Popup */}
      {isPopupOpen && <AddressPopup onClose={() => setIsPopupOpen(false)} />}
    </nav>
  );
};

export default Navbar;
