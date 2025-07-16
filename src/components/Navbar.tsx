import { useLocation, useNavigate } from "react-router-dom";
import navLinks from "../constants/NavLink";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [showHeader, setShowHeader] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsAtTop(currentScrollY <= 10);

      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`
      fixed py-2 top-0 left-0 w-full z-50 transition-transform duration-300
      ${showHeader ? "translate-y-0" : "-translate-y-full"}
      // ${
        isAtTop
          ? "bg-[#ff6600]/100 backdrop-blur-md"
          : "bg-[#ff6600]/80 backdrop-blur-md"
      }
    `}
    >
      <div className="w-[85%] flex justify-between mx-auto items-center">
        <img
          src="/src/assets/suitmedia-rmv.png"
          alt="Suitmedia-Logo"
          className="w-25"
        />
        <ul className="flex gap-6 text-slate-100  font-light me-5">
          {navLinks.map((nav, index) => {
            const isActive = location.pathname === nav.path;
            return (
              <li
                key={index}
                className={`hover:transition-all ease-in-out hover:text-white duration-100 border-white pb-1 cursor-pointer hover:border-b-2 hover:font-extralight   ${
                  isActive ? "border-b-4" : ""
                }`}
                onClick={() => navigate(nav.path)}
              >
                <span>{nav.name}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
