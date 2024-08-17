import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-700">Dashboard</h1>
      <div className="flex items-center space-x-4">
        <FaUserCircle className="text-gray-700 text-3xl" />
        <span className="text-gray-700">Admin</span>
      </div>
    </header>
  );
};

export default Header;
