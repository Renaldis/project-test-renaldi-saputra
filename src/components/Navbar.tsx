import { useLocation, useNavigate } from "react-router-dom";
import navLinks from "../constants/NavLink";
import { useEffect, useRef, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";
import { Menu } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

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
  const handleNavigate = (path: string) => {
    navigate(path);
    setOpen(false);
  };
  return (
    <div
      className={`
        fixed top-0 left-0 w-full z-50 transition-transform duration-300 py-3
        ${showHeader ? "translate-y-0" : "-translate-y-full"}
        ${
          isAtTop
            ? "bg-[#ff6600]/100 backdrop-blur-md"
            : "bg-[#ff6600]/80 backdrop-blur-md"
        }
      `}
    >
      <div className="w-[90%] mx-auto flex justify-between items-center">
        <img
          src="/assets/suitmedia-rmv.png"
          alt="Suitmedia-Logo"
          className="w-28"
        />

        <ul className="hidden md:flex gap-6 text-slate-100 font-light">
          {navLinks.map((nav, index) => {
            const isActive = location.pathname === nav.path;
            return (
              <li
                key={index}
                className={`hover:text-white hover:font-light cursor-pointer border-b-2 pb-1 ${
                  isActive ? "border-white" : "border-transparent"
                }`}
                onClick={() => navigate(nav.path)}
              >
                {nav.name}
              </li>
            );
          })}
        </ul>

        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="text-white">
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-white text-black px-6 py-6"
            >
              {/* Logo or Header */}
              <div className="mb-8 flex justify-between items-center">
                <img
                  src="/assets/suitmedia-logo2.png"
                  alt="Logo"
                  className="w-24"
                />
              </div>

              {/* Menu Links */}
              <div className="flex flex-col gap-4">
                {navLinks.map((nav, index) => {
                  const isActive = location.pathname === nav.path;
                  return (
                    <button
                      key={index}
                      onClick={() => handleNavigate(nav.path)}
                      className={`text-left px-2 py-2 rounded-md transition-colors duration-200
                    ${
                      isActive
                        ? "font-semibold border-l-4 border-orange-500 bg-orange-50 text-orange-600"
                        : "hover:bg-orange-100 text-gray-700"
                    }
                  `}
                    >
                      {nav.name}
                    </button>
                  );
                })}
              </div>

              <div className="mt-10 text-sm text-gray-400">
                © {new Date().getFullYear()} Suitmedia
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
