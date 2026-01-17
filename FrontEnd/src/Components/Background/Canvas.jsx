import React from "react";

const Canvas = ({ children }) => {
  return (
    <div className="relative min-h-screen pt-22 bg-[#fffefc] ">
      {/* Fine paper dots */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.05)_0.5px,transparent_0.5px)] bg-[size:12px_12px]" />

      {/* Soft fibers */}
      <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />

      {/* Gentle lighting */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent pointer-events-none" />
      <div>
        <div className=" font-sans  ">{children}</div>
      </div>
    </div>
  );
};

export default Canvas;
