"use client";
import React from "react";

import { RotatingLines } from "react-loader-spinner";
const FetchLoading = () => {
  return (
    <div className="mt-16 w-full h-64 flex items-center justify-center relative z-10">
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="35"
        visible={true}
      />
    </div>
  );
};

export default FetchLoading;
