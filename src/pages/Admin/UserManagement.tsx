// pages/UserManagement.tsx
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";

interface User {
  id: string;
  username: string;
  phone: string;
  email: string;
  numberOfOrders: number;
}

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<User, "id">),
      })) as User[];
      setUsers(usersList);
    };

    fetchUsers();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery) ||
      user.email.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-indigo-50 to-blue-50">
      <main className="flex-grow flex items-center justify-center">
        <div className="max-w-7xl w-full space-y-8 p-6 bg-white shadow-lg rounded-lg relative">
          <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">
            User Management
          </h1>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search users..."
              className="p-2 border border-gray-300 rounded-lg shadow-sm w-full"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
            <thead>
              <tr>
                <th className="p-2 border-b">Name</th>
                <th className="p-2 border-b">Phone No.</th>
                <th className="p-2 border-b">Email</th>
                <th className="p-2 border-b">No. of Orders</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="p-2 border-b">{user.username}</td>
                  <td className="p-2 border-b">{user.phone}</td>
                  <td className="p-2 border-b">{user.email}</td>
                  <td className="p-2 border-b">{user.numberOfOrders}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <footer className="bg-gray-100 py-4">
        <div className="max-w-7xl mx-auto text-center text-gray-500">
          © 2024 Caygnus. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default UserManagement;
