import React from "react";

const AdminDashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-blue-600">Admin Panel</h1>
        </div>
        <nav className="mt-6">
          <ul>
            <li className="p-3 hover:bg-gray-200">
              <a href="#" className="flex items-center">
                <span className="material-icons">dashboard</span>
                <span className="ml-3">Dashboard</span>
              </a>
            </li>
            <li className="p-3 hover:bg-gray-200">
              <a href="#" className="flex items-center">
                <span className="material-icons">shopping_cart</span>
                <span className="ml-3">Products</span>
              </a>
            </li>
            <li className="p-3 hover:bg-gray-200">
              <a href="#" className="flex items-center">
                <span className="material-icons">list_alt</span>
                <span className="ml-3">Orders</span>
              </a>
            </li>
            <li className="p-3 hover:bg-gray-200">
              <a href="#" className="flex items-center">
                <span className="material-icons">people</span>
                <span className="ml-3">Users</span>
              </a>
            </li>
            <li className="p-3 hover:bg-gray-200">
              <a href="#" className="flex items-center">
                <span className="material-icons">analytics</span>
                <span className="ml-3">Analytics</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <header className="flex justify-between items-center pb-6 border-b-2 border-gray-300">
          <h2 className="text-2xl font-semibold">Dashboard</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">
            Add Product
          </button>
        </header>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Cards */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium">Total Sales</h3>
            <p className="mt-2 text-3xl font-bold">$25,000</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium">Orders</h3>
            <p className="mt-2 text-3xl font-bold">150</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium">Users</h3>
            <p className="mt-2 text-3xl font-bold">3,200</p>
          </div>
        </div>

        {/* Tables or charts can be added here */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
          <div className="overflow-x-auto bg-white rounded-lg shadow-md p-6">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-2 px-4 text-left">Order ID</th>
                  <th className="py-2 px-4 text-left">Product</th>
                  <th className="py-2 px-4 text-left">Customer</th>
                  <th className="py-2 px-4 text-left">Date</th>
                  <th className="py-2 px-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4">#1234</td>
                  <td className="py-2 px-4">Product 1</td>
                  <td className="py-2 px-4">John Doe</td>
                  <td className="py-2 px-4">01/01/2024</td>
                  <td className="py-2 px-4">
                    <span className="text-green-600">Completed</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4">#1235</td>
                  <td className="py-2 px-4">Product 2</td>
                  <td className="py-2 px-4">Jane Doe</td>
                  <td className="py-2 px-4">01/02/2024</td>
                  <td className="py-2 px-4">
                    <span className="text-yellow-600">Pending</span>
                  </td>
                </tr>
                {/* More rows */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
