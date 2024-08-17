import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebaseConfig";

interface Address {
  fullName: string;
  mobileNumber: string;
  pincode: string;
  flatDetails: string;
  areaDetails: string;
  landmark: string;
  state: string;
}

interface AddressListPopupProps {
  onClose: () => void;
}

const AddressListPopup: React.FC<AddressListPopupProps> = ({ onClose }) => {
  const [user] = useAuthState(auth);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState<
    number | null
  >(null);
  const [newAddress, setNewAddress] = useState<Address>({
    fullName: "",
    mobileNumber: "",
    pincode: "",
    flatDetails: "",
    areaDetails: "",
    landmark: "",
    state: "",
  });

  useEffect(() => {
    if (user) {
      const fetchAddresses = async () => {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setAddresses(userData.addresses || []);
        }
      };

      fetchAddresses();
    }
  }, [user]);

  const handleSubmit = async () => {
    if (user) {
      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        const userData = userDoc.data();
        const updatedAddresses = [...addresses];

        if (selectedAddressIndex !== null) {
          updatedAddresses[selectedAddressIndex] = newAddress;
        } else if (addresses.length < 3) {
          updatedAddresses.push(newAddress);
        } else {
          alert("You can only add up to 3 addresses.");
          return;
        }

        await updateDoc(userDocRef, { addresses: updatedAddresses });
        setAddresses(updatedAddresses); // Update the list of addresses
        onClose(); // Close the popup after successful submission
      } catch (error) {
        console.error("Error saving address: ", error);
        alert("Failed to save address. Please try again.");
      }
    }
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressClick = (index: number) => {
    setSelectedAddressIndex(index);
    setNewAddress(addresses[index]);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Manage Your Addresses</h2>
        <div className="space-y-4">
          {addresses.length > 0 ? (
            <div className="space-y-2 mb-4">
              {addresses.map((address, index) => (
                <div
                  key={index}
                  className={`border border-gray-300 p-3 rounded-md cursor-pointer ${
                    selectedAddressIndex === index ? "bg-gray-100" : ""
                  }`}
                  onClick={() => handleAddressClick(index)}
                >
                  <p className="font-semibold">{address.flatDetails}</p>
                  <p>{address.areaDetails}</p>
                  <p>{address.state}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No addresses found.</p>
          )}

          <input
            type="text"
            name="fullName"
            value={newAddress.fullName}
            onChange={handleAddressChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Full Name (First and Last Name) *"
          />
          <input
            type="text"
            name="mobileNumber"
            value={newAddress.mobileNumber}
            onChange={handleAddressChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Mobile Number *"
          />
          <input
            type="text"
            name="pincode"
            value={newAddress.pincode}
            onChange={handleAddressChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Pincode"
          />
          <input
            type="text"
            name="flatDetails"
            value={newAddress.flatDetails}
            onChange={handleAddressChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Flat, House no., Building, Company, Apartment"
          />
          <input
            type="text"
            name="areaDetails"
            value={newAddress.areaDetails}
            onChange={handleAddressChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Area, Street, Sector, Village"
          />
          <input
            type="text"
            name="landmark"
            value={newAddress.landmark}
            onChange={handleAddressChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Landmark"
          />
          <input
            type="text"
            name="state"
            value={newAddress.state}
            onChange={handleAddressChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="State"
          />
        </div>
        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressListPopup;
