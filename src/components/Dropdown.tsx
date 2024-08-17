import React from "react";
import { FaCog, FaHeart, FaSignOutAlt, FaStar, FaUser } from "react-icons/fa";
import { auth } from "../firebaseConfig";

interface DropdownProps {
  onClose: () => void;
}

const Dropdown: React.FC<DropdownProps> = ({ onClose }) => {
  const handleSignOut = () => {
    auth.signOut().then(() => {
      onClose();
    });
  };

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-50 transition-all duration-300 ease-in-out">
      <ul className="py-1">
        <li>
          <a
            href="/profile"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-200"
          >
            <FaUser className="mr-2" />
            Your Profile
          </a>
        </li>
        <li>
          <a
            href="/wishlist"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-200"
          >
            <FaHeart className="mr-2" />
            Wish List
          </a>
        </li>
        <li>
          <a
            href="/new-launch"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-200"
          >
            <FaStar className="mr-2" />
            New Launch
          </a>
        </li>
        <li>
          <a
            href="/settings"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-200"
          >
            <FaCog className="mr-2" />
            Settings
          </a>
        </li>
        <li>
          <button
            onClick={handleSignOut}
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left transition duration-200"
          >
            <FaSignOutAlt className="mr-2" />
            Sign Out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;
