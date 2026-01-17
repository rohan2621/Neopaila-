import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Img } from "./Img";
import gsap from "gsap";

const portalRoot = document.getElementById("portal-root");

const MIN = 1;
const MAX = 4;

const Lightbox = ({ files, index, setIndex, onClose }) => {
  const file = files[index];

  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  const [scale, setScale] = useState(1);
  const [closing, setClosing] = useState(false);

  const touchStartX = useRef(0);
  const pinchStart = useRef(0);

  /* ---------------- OPEN ---------------- */
  useEffect(() => {
    document.body.style.overflow = "hidden";

    gsap.set(contentRef.current, { scale: 0.96, opacity: 0 });
    gsap.set(overlayRef.current, { opacity: 0 });

    gsap.to(overlayRef.current, { opacity: 1, duration: 0.25 });
    gsap.to(contentRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.3,
      ease: "power3.out",
    });

    const esc = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", esc);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", esc);
    };
  }, []);

  /* ---------------- CLOSE ---------------- */
  const close = () => {
    if (closing) return;
    setClosing(true);

    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.2,
      onComplete: onClose,
    });
  };

  /* ---------------- ZOOM ---------------- */
  const onWheel = (e) => {
    e.preventDefault();
    setScale((s) => Math.min(MAX, Math.max(MIN, s - e.deltaY * 0.001)));
  };

  /* ---------------- TOUCH ---------------- */
  const onTouchStart = (e) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      pinchStart.current = Math.sqrt(dx * dx + dy * dy);
    } else {
      touchStartX.current = e.touches[0].clientX;
    }
  };

  const onTouchMove = (e) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const delta = (dist - pinchStart.current) * 0.005;

      setScale((s) => Math.min(MAX, Math.max(MIN, s + delta)));

      pinchStart.current = dist;
    }
  };

  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx > 80 && index > 0) setIndex(index - 1);
    if (dx < -80 && index < files.length - 1) setIndex(index + 1);
  };

  if (!file) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center"
      onClick={close}
    >
      {/* CLOSE */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          close();
        }}
        className="absolute top-5 right-5 text-white text-4xl z-30"
      >
        ✕
      </button>

      {/* CONTENT */}
      <div
        ref={contentRef}
        onClick={(e) => e.stopPropagation()}
        onWheel={file.fileType === "image" ? onWheel : undefined}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className="relative z-20 flex items-center justify-center"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          transition: "transform 0.15s ease-out",
        }}
      >
        {file.fileType === "image" ? (
          <Img
            src={file.filePath}
            noSize
            className="max-w-[95vw] max-h-[95vh] object-contain pointer-events-none"
          />
        ) : (
          <video
            src={file.url}
            controls
            autoPlay
            className="max-w-[95vw] max-h-[95vh]"
          />
        )}
      </div>

      {/* NAV */}
      {index > 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIndex(index - 1);
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-6xl"
        >
          ‹
        </button>
      )}

      {index < files.length - 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIndex(index + 1);
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-6xl"
        >
          ›
        </button>
      )}
    </div>,
    portalRoot
  );
};

export default Lightbox;
