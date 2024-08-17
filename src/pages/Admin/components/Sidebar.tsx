import { FaBox, FaHome, FaImage, FaPercent, FaTags } from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white h-screen p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center">Admin Panel</h1>
      </div>
      <nav>
        <ul className="space-y-6">
          <li>
            <a
              href="/dashboard"
              className="flex items-center p-2 hover:bg-gray-700 rounded-lg transition"
            >
              <FaHome className="mr-2" />
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="/categories"
              className="flex items-center p-2 hover:bg-gray-700 rounded-lg transition"
            >
              <FaTags className="mr-2" />
              Categories
            </a>
          </li>
          <li>
            <a
              href="/products"
              className="flex items-center p-2 hover:bg-gray-700 rounded-lg transition"
            >
              <FaBox className="mr-2" />
              Products
            </a>
          </li>
          <li>
            <a
              href="/banners"
              className="flex items-center p-2 hover:bg-gray-700 rounded-lg transition"
            >
              <FaImage className="mr-2" />
              Banners
            </a>
          </li>
          <li>
            <a
              href="/coupons"
              className="flex items-center p-2 hover:bg-gray-700 rounded-lg transition"
            >
              <FaPercent className="mr-2" />
              Coupons
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
