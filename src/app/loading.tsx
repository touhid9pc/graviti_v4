import React from "react";

const Loading = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-none">
      <div className="text-xl md:text-2xl font-bold text-gray-800 animate-pulse tracking-wide">
        loading...
      </div>
    </div>
  );
};

export default Loading;
