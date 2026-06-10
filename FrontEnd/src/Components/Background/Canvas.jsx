import React from "react";

const Canvas = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-[#F7F4EF]">
      {/* Fine paper dots */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.04)_0.5px,transparent_0.5px)] bg-[size:12px_12px]" />

      {/* Paper fiber texture */}
      <div className="absolute inset-0 opacity-[0.07] mix-blend-overlay " />

      {/* Diagonal red tint */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: "",
        }}
      />

      {/* Ambient orb — top left */}
      <div
        aria-hidden
        className="pointer-events-none absolute rounded-full"
        style={{
          width: 520,
          height: 520,
          top: "-15%",
          left: "-12%",
          background: "",
          filter: "blur(56px)",
        }}
      />

      {/* Ambient orb — bottom right */}
      <div
        aria-hidden
        className="pointer-events-none absolute rounded-full"
        style={{
          width: 360,
          height: 360,
          bottom: "5%",
          right: "-8%",
          background: "",
          filter: "blur(40px)",
        }}
      />

      {/* Top warm fade — blends navbar pill into canvas */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-10"
        style={{
          height: 100,
          background: "",
        }}
      />

      {/* Bottom fade */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10"
        style={{
          height: 80,
          background: "linear-gradient(to top, #F7F4EF 0%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-20 font-sans">{children}</div>
    </div>
  );
};

export default Canvas;
