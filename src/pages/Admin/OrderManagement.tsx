// pages/OrderManagement.tsx
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

interface Order {
  id: string;
  customerName: string;
  totalAmount: number;
}

const OrderManagement = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const querySnapshot = await getDocs(collection(db, 'orders'));
      const ordersList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Order[];
      setOrders(ordersList);
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Order Management</h1>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
        <thead>
          <tr>
            <th className="p-2 border-b">ID</th>
            <th className="p-2 border-b">Customer Name</th>
            <th className="p-2 border-b">Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td className="p-2 border-b">{order.id}</td>
              <td className="p-2 border-b">{order.customerName}</td>
              <td className="p-2 border-b">${order.totalAmount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagement;
