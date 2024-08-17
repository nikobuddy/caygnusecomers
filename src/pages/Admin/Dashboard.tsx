import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  FaBox,
  FaImage,
  FaPercent,
  FaShoppingCart,
  FaTags,
  FaUsers,
} from "react-icons/fa";
import { db } from "../../firebaseConfig";
import AdminPagecategres from "./Addproducts";
import AddBanner from "./AdminBanner";
import AddCategories from "./AdminPageCategores";
import CouponsAdminPage from "./CouponsAdminPage";
import OrderManagement from "./OrderManagement";
import UserManagement from "./UserManagement";
import ViewAndUpdateProduct from "./ViewAndUpdateProduct";
import ManageProducts from "./ViewAndUpdateProduct";

interface DashboardData {
  users: number;
  products: number;
  categories: number;
  coupons: number;
  couponCodesUsed: number;
  orders: number;
}

type Section =
  | "dashboard"
  | "categories"
  | "products"
  | "banners"
  | "coupons"
  | "users"
  | "orders"
  | "addProduct"
  | "viewProducts";

const Dashboard = () => {
  const [data, setData] = useState<DashboardData>({
    users: 0,
    products: 0,
    categories: 0,
    coupons: 0,
    couponCodesUsed: 0,
    orders: 0,
  });

  const [selectedSection, setSelectedSection] = useState<Section>("dashboard");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, "users"));
        const productsSnapshot = await getDocs(collection(db, "products"));
        const categoriesSnapshot = await getDocs(collection(db, "categories"));
        const couponsSnapshot = await getDocs(collection(db, "coupons"));
        const ordersSnapshot = await getDocs(collection(db, "orders"));

        const couponCodesUsed = couponsSnapshot.docs.reduce(
          (total, doc) => total + (doc.data().used || 0),
          0
        );

        setData({
          users: usersSnapshot.size,
          products: productsSnapshot.size,
          categories: categoriesSnapshot.size,
          coupons: couponsSnapshot.size,
          couponCodesUsed,
          orders: ordersSnapshot.size,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSectionChange = (section: Section) => {
    setSelectedSection(section);
    if (section === "products") {
      setDropdownOpen(!dropdownOpen);
    } else {
      setDropdownOpen(false);
    }
  };

  const renderContent = () => {
    switch (selectedSection) {
      case "dashboard":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <Card
              title="Categories"
              value={data.categories}
              icon={<FaTags />}
              color="bg-blue-600"
            />
            <Card
              title="Products"
              value={data.products}
              icon={<FaBox />}
              color="bg-green-600"
            />
            <Card
              title="Users"
              value={data.users}
              icon={<FaUsers />}
              color="bg-yellow-600"
            />
            <Card
              title="Coupons"
              value={data.coupons}
              icon={<FaPercent />}
              color="bg-red-600"
            />
            <Card
              title="Coupon Codes Used"
              value={data.couponCodesUsed}
              icon={<FaTags />}
              color="bg-indigo-600"
            />
            <Card
              title="Orders"
              value={data.orders}
              icon={<FaShoppingCart />}
              color="bg-purple-600"
            />
          </div>
        );
      case "categories":
        return (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <AdminPagecategres />
          </div>
        );
      case "banners":
        return (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <AddBanner />
          </div>
        );
      case "coupons":
        return (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <CouponsAdminPage />
          </div>
        );
      case "users":
        return (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <UserManagement />
          </div>
        );
      case "orders":
        return (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <OrderManagement />
          </div>
        );
      case "addProduct":
        return (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <AddCategories />
          </div>
        );
      case "viewProducts":
        return (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <ManageProducts />
          </div>
        );
      default:
        return (
          <div className="p-6 bg-white rounded-lg shadow-md">
            Select an option from the sidebar
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6">
        <nav>
          <ul>
            <li className="mb-4">
              <a
                href="#!"
                onClick={() => handleSectionChange("dashboard")}
                className={`text-gray-800 flex items-center space-x-2 cursor-pointer py-2 px-4 rounded-lg transition-colors ${
                  selectedSection === "dashboard" ? "bg-gray-200" : ""
                }`}
              >
                <FaTags /> <span>Dashboard</span>
              </a>
            </li>
            <li className="mb-4">
              <a
                href="#!"
                onClick={() => handleSectionChange("categories")}
                className={`text-gray-800 flex items-center space-x-2 cursor-pointer py-2 px-4 rounded-lg transition-colors ${
                  selectedSection === "categories" ? "bg-gray-200" : ""
                }`}
              >
                <FaTags /> <span>Categories</span>
              </a>
            </li>
            <li className="mb-4 relative">
              <a
                href="#!"
                onClick={() => handleSectionChange("products")}
                className={`text-gray-800 flex items-center space-x-2 cursor-pointer py-2 px-4 rounded-lg transition-colors ${
                  selectedSection === "products" ? "bg-gray-200" : ""
                }`}
              >
                <FaBox /> <span>Products</span>
              </a>
              {dropdownOpen && (
                <ul className="ml-6 mt-2 bg-gray-100 rounded-lg shadow-lg">
                  <li className="mb-2">
                    <a
                      href="#!"
                      onClick={() => handleSectionChange("addProduct")}
                      className={`text-gray-600 flex items-center space-x-2 cursor-pointer py-1 px-2 rounded-lg transition-colors ${
                        selectedSection === "addProduct" ? "bg-gray-200" : ""
                      }`}
                    >
                      <FaBox /> <span>Add Product</span>
                    </a>
                  </li>
                  <li className="mb-2">
                    <a
                      href="#!"
                      onClick={() => handleSectionChange("viewProducts")}
                      className={`text-gray-600 flex items-center space-x-2 cursor-pointer py-1 px-2 rounded-lg transition-colors ${
                        selectedSection === "viewProducts" ? "bg-gray-200" : ""
                      }`}
                    >
                      <FaBox /> <span>View All Products</span>
                    </a>
                  </li>
                </ul>
              )}
            </li>
            <li className="mb-4">
              <a
                href="#!"
                onClick={() => handleSectionChange("banners")}
                className={`text-gray-800 flex items-center space-x-2 cursor-pointer py-2 px-4 rounded-lg transition-colors ${
                  selectedSection === "banners" ? "bg-gray-200" : ""
                }`}
              >
                <FaImage /> <span>Banners</span>
              </a>
            </li>
            <li className="mb-4">
              <a
                href="#!"
                onClick={() => handleSectionChange("coupons")}
                className={`text-gray-800 flex items-center space-x-2 cursor-pointer py-2 px-4 rounded-lg transition-colors ${
                  selectedSection === "coupons" ? "bg-gray-200" : ""
                }`}
              >
                <FaPercent /> <span>Coupons</span>
              </a>
            </li>
            <li className="mb-4">
              <a
                href="#!"
                onClick={() => handleSectionChange("users")}
                className={`text-gray-800 flex items-center space-x-2 cursor-pointer py-2 px-4 rounded-lg transition-colors ${
                  selectedSection === "users" ? "bg-gray-200" : ""
                }`}
              >
                <FaUsers /> <span>Users</span>
              </a>
            </li>
            <li className="mb-4">
              <a
                href="#!"
                onClick={() => handleSectionChange("orders")}
                className={`text-gray-800 flex items-center space-x-2 cursor-pointer py-2 px-4 rounded-lg transition-colors ${
                  selectedSection === "orders" ? "bg-gray-200" : ""
                }`}
              >
                <FaShoppingCart /> <span>Orders</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white shadow-md p-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
            onClick={() => console.log("Notifications Clicked")}
          >
            Notifications
          </button>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 bg-gray-50">{renderContent()}</main>
      </div>
    </div>
  );
};

interface CardProps {
  title: string;
  value: number;
  icon: JSX.Element;
  color: string;
}

const Card: React.FC<CardProps> = ({ title, value, icon, color }) => {
  return (
    <div
      className={`text-white p-6 rounded-lg shadow-lg flex items-center justify-between transition-transform transform hover:scale-105 ${color}`}
    >
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-2xl">{value}</p>
      </div>
      <div className="text-4xl">{icon}</div>
    </div>
  );
};

export default Dashboard;
