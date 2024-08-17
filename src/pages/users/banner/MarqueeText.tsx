import React from "react";

const MarqueeText: React.FC = () => {
  return (
    <div className="overflow-hidden whitespace-nowrap bg-gray-100 py-2">
      <div className="inline-block animate-marquee">
        <span className="text-lg font-semibold text-gray-800 mx-4">
          New offer is here by Caygnus!
        </span>
        <span className="text-lg font-semibold text-gray-800 mx-4">
          We are offering top hacking products.
        </span>
        <span className="text-lg font-semibold text-gray-800 mx-4">
          Youth should get the best products!
        </span>
      </div>
    </div>
  );
};

export default MarqueeText;
