import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { db } from "../../firebaseConfig";

const AddBanner: React.FC = () => {
  const [bannerUrl, setBannerUrl] = useState("");
  const [bannerAlt, setBannerAlt] = useState("");
  const [banners, setBanners] = useState<
    { id: string; url: string; alt: string }[]
  >([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "banners"), (snapshot) => {
      const bannersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as { id: string; url: string; alt: string }[];
      setBanners(bannersData);
    });

    return () => unsubscribe();
  }, []);

  const handleAddBanner = async () => {
    if (bannerUrl && bannerAlt) {
      try {
        await addDoc(collection(db, "banners"), {
          url: bannerUrl,
          alt: bannerAlt,
        });
        setBannerUrl("");
        setBannerAlt("");
      } catch (error) {
        console.error("Error adding banner: ", error);
      }
    }
  };

  const handleDeleteBanner = async (id: string) => {
    try {
      await deleteDoc(doc(db, "banners", id));
    } catch (error) {
      console.error("Error deleting banner: ", error);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
        Manage Banners
      </h2>
      <div className="bg-white shadow-lg rounded-2xl p-8 space-y-8">
        <div className="flex flex-col gap-6">
          <input
            type="text"
            value={bannerUrl}
            onChange={(e) => setBannerUrl(e.target.value)}
            placeholder="Enter Banner URL"
            className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          />
          <input
            type="text"
            value={bannerAlt}
            onChange={(e) => setBannerAlt(e.target.value)}
            placeholder="Enter Alt Text"
            className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          />
          <button
            onClick={handleAddBanner}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 text-lg font-semibold"
          >
            Add Banner
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="flex flex-col bg-white shadow-md rounded-xl border border-gray-200 overflow-hidden"
            >
              <img
                src={banner.url}
                alt={banner.alt}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <p className="text-gray-800 text-lg font-semibold truncate">
                    {banner.alt}
                  </p>
                  <p className="text-gray-600 text-sm truncate">{banner.url}</p>
                </div>
                <button
                  onClick={() => handleDeleteBanner(banner.id)}
                  className="mt-4 self-end text-red-600 hover:text-red-800 transition duration-300"
                >
                  <FaTrashAlt className="w-6 h-6" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddBanner;
