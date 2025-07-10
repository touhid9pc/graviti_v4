"use client";

import React from "react";

const blobs = [
  {
    id: "blob1",
    top: "-20%",
    left: "-10%",
    color: "#0ff", // cyan
    size: "lg",
    path: "M48.4,-68.3C61.6,-57.1,70.2,-41.4,62.3,-28.9C54.4,-16.5,29.9,-7.4,20.5,2C11.1,11.4,16.7,21.1,15.8,34.6C14.9,48.1,7.5,65.3,-2.6,68.9C-12.7,72.5,-25.4,62.4,-37.5,52.6C-49.6,42.8,-61.1,33.2,-62.9,21.8C-64.8,10.4,-57,-2.8,-54.1,-19.4C-51.1,-35.9,-53.1,-55.9,-44.9,-68.7C-36.8,-81.6,-18.4,-87.3,-0.4,-86.8C17.6,-86.3,35.3,-79.6,48.4,-68.3Z",
  },
  {
    id: "blob2",
    bottom: "-10%",
    right: "-15%",
    color: "#a8ffe0", // mint
    size: "lg",
    path: "M40.8,-59.6C54.2,-48.3,66.6,-36.1,70.4,-21.3C74.2,-6.5,69.4,10.7,62.4,27.4C55.5,44.2,46.4,60.5,32.4,67.6C18.4,74.7,-0.5,72.7,-17.7,66.2C-34.9,59.7,-50.5,48.7,-59.1,34.1C-67.7,19.5,-69.2,1.3,-66.6,-16.3C-63.9,-33.9,-57.1,-50.8,-44.7,-63.3C-32.4,-75.8,-16.2,-83.9,-0.4,-83.3C15.4,-82.7,30.8,-73.3,40.8,-59.6Z",
  },
  {
    id: "blob3",
    top: "40%",
    left: "30%",
    color: "#b5cfff", // pastel blue
    size: "md",
    path: "M44.6,-62.6C56.9,-51.3,65.7,-37.4,67.8,-23.1C69.8,-8.7,65,6.1,59.3,21.6C53.6,37,47,53.2,34.4,63.1C21.7,73,2.9,76.5,-14.7,73.7C-32.2,70.8,-48.5,61.7,-58.5,47.8C-68.6,33.8,-72.4,15,-68.6,-2.7C-64.8,-20.3,-53.3,-36.9,-40.1,-48.3C-26.9,-59.7,-13.4,-65.9,1.9,-68.3C17.3,-70.6,34.6,-69.9,44.6,-62.6Z",
  },
];

const sizeMap = {
  sm: "w-[400px] h-[400px]",
  md: "w-[600px] h-[600px]",
  lg: "w-[800px] h-[800px]",
};

export default function AnimatedBlob() {
  return (
    <div className="fixed inset-0 h-full -z-10 overflow-hidden bg-black">
      {/* Shared filter definition */}
      {/* <svg width="0" height="0">
        <defs>
          <filter
            id="blob-gaussian-blur"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur stdDeviation="60" />
          </filter>
        </defs>
      </svg> */}

      {/* Blobs */}
      {blobs.map((blob) => (
        <svg
          key={blob.id}
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
          className={`absolute ${
            (sizeMap as any)[blob.size]
          } blur-3xl opacity-20 pointer-events-none`}
          style={{
            top: blob.top,
            bottom: blob.bottom,
            left: blob.left,
            right: blob.right,
          }}
        >
          <path
            fill={blob.color}
            d={blob.path}
            transform="translate(100 100)"
            filter="url(#blob-gaussian-blur)"
          />
        </svg>
      ))}
    </div>
  );
}
