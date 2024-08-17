import React from "react";
import BannerSlider from "./BannerSlider";
import MarqueeText from "./MarqueeText";

const Banners: React.FC = () => {
  return (
    <div>
      <BannerSlider />
      <MarqueeText />
    </div>
  );
};

export default Banners;
