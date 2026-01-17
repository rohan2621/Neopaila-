import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MainCateValues } from "../utils/Resource";

const ITEM_WIDTH = 120;

const MainCate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  /* ---------------- ENTRY ANIMATION ---------------- */
  useGSAP(() => {
    gsap.from(".mainCat", {
      x: -60,
      opacity: 0,
      duration: 1.1,
      ease: "power3.out",
    });
  }, []);

  /* ---------------- HOVER EFFECT ---------------- */
  const handleMove = (e, solid) => {
    if (window.innerWidth < 1024) return;

    const inner = e.currentTarget.querySelector(".cate-inner");
    const bounds = e.currentTarget.getBoundingClientRect();

    const dx = e.clientX - (bounds.left + bounds.width / 2);
    const dy = e.clientY - (bounds.top + bounds.height / 2);

    const scaleX = 1 + Math.min(Math.abs(dx) / bounds.width, 0.15);
    const scaleY = 1 + Math.min(Math.abs(dy) / bounds.height, 0.15);

    gsap.to(inner, {
      x: dx * 0.15,
      y: dy * 0.15,
      scaleX,
      scaleY,
      backgroundColor: solid ? "#1f2937" : "#f3f4f6",
      boxShadow: "0px 6px 16px rgba(0,0,0,0.16)",
      duration: 0.25,
      ease: "power2.out",
      overwrite: true,
    });
  };

  const handleLeave = (e, solid) => {
    if (window.innerWidth < 1024) return;

    const inner = e.currentTarget.querySelector(".cate-inner");

    gsap.to(inner, {
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
      backgroundColor: solid ? "#1f2937" : "transparent",
      boxShadow: "none",
      duration: 0.35,
      ease: "power3.out",
    });
  };

  /* ---------------- SEARCH ---------------- */
  const handleKeyPress = (e) => {
    if (e.key !== "Enter") return;
    const query = e.target.value.trim();
    if (!query) return;

    if (location.pathname === "/posts") {
      setSearchParams({
        ...Object.fromEntries(searchParams),
        search: query,
      });
    } else {
      navigate(`/posts?search=${query}`);
    }
  };

  return (
    <div className="w-full overflow-visible">
      <div className="mainCat rounded-3xl bg-white/80 shadow-lg backdrop-blur overflow-visible">
        {/* 🔒 FLEX LOCKED WRAPPER */}
        <div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:flex-nowrap overflow-visible">
          {/* ---------------- CATEGORIES ---------------- */}
          <div className="min-w-0 flex-1 overflow-visible">
            <div className="flex items-center gap-4 px-2 py-2 overflow-x-auto overflow-y-visible scrollbar-hide">
              {MainCateValues.map((link, i) => (
                <div
                  key={i}
                  style={{ minWidth: ITEM_WIDTH }}
                  className="relative h-10 flex-shrink-0 overflow-visible"
                  onMouseMove={(e) => handleMove(e, link.solid)}
                  onMouseLeave={(e) => handleLeave(e, link.solid)}
                >
                  <Link
                    to={link.path}
                    className="relative block h-full w-full overflow-visible"
                  >
                    <div
                      className={`cate-inner absolute inset-0 flex items-center justify-center rounded-full text-sm font-medium will-change-transform
                      ${link.solid ? "text-white" : "text-gray-800"}`}
                      style={{
                        backgroundColor: link.solid ? "#1f2937" : "transparent",
                      }}
                    >
                      {link.name}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* ---------------- DIVIDER ---------------- */}
          <span className="hidden md:block flex-shrink-0 px-3 text-lg font-medium text-gray-400 select-none">
            |
          </span>

          {/* ---------------- SEARCH ---------------- */}
          <div className="flex flex-shrink-0 items-center rounded-3xl bg-gray-100 px-4 py-3 w-full md:w-[260px] lg:w-72">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 192.904 192.904"
              width="16"
              className="mr-3 rotate-90 fill-gray-500 flex-shrink-0"
            >
              <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803z" />
            </svg>

            <input
              type="text"
              placeholder="Search Something..."
              className="w-full bg-transparent text-sm text-gray-700 outline-none"
              onKeyDown={handleKeyPress}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainCate;
