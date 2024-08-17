import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebaseConfig";

interface Banner {
  id: string;
  url: string;
  alt: string;
}

const BannerSlider: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    const fetchBanners = async () => {
      const bannerCollection = collection(db, "banners");
      const bannerSnapshot = await getDocs(bannerCollection);
      const bannerList = bannerSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Banner, "id">),
      }));
      setBanners(bannerList);
    };

    fetchBanners();
  }, []);

  return (
    <div className="relative overflow-hidden w-full">
      <div className="flex space-x-1 overflow-x-auto w-full">
        {banners.map((banner) => (
          <div key={banner.id} className="flex-shrink-0 w-full">
            <img
              src={banner.url}
              alt={banner.alt}
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          </div>
        ))}
      </div>
      <div className="absolute top-1/2 transform -translate-y-1/2 left-0 ml-2 flex items-center space-x-2">
        {/* Add navigation controls if needed */}
      </div>
    </div>
  );
};

export default BannerSlider;
