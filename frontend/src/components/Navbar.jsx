import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ user, setUser }) {
  const [activeMenu, setActiveMenu] = useState("beranda");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (window.scrollY === 0) {
        setActiveMenu("beranda");
        return;
      }

      const sections = ["beranda", "tentang", "daftar-kuliner"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveMenu(section === "daftar-kuliner" ? "kuliner" : section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setIsMobileOpen(false);

    if (id === "beranda") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setActiveMenu("beranda");
      return;
    }

    if (id === "kuliner") {
      setActiveMenu("kuliner");
      const element = document.getElementById("daftar-kuliner");
      if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      setActiveMenu(id);
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleLogout = () => {
    setIsMobileOpen(false);
    localStorage.removeItem("is_logged_in");
    localStorage.removeItem("user_role");
    setUser(null);
    navigate("/");
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 bg-white ${
        isScrolled
          ? "shadow-[0_4px_25px_rgba(15,23,42,0.03)] h-16 border-b border-slate-100"
          : "h-20"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 h-full flex justify-between items-center">
        <Link
          to="/"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("beranda");
          }}
          className="text-xl font-black tracking-tight text-slate-900 select-none"
        >
          Kuliner<span className="text-[#008153]">Banua</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-xs font-bold tracking-wide">
          <button
            onClick={() => scrollToSection("beranda")}
            className={`relative py-2 text-[11px] uppercase tracking-widest font-black transition-colors focus:outline-none ${
              activeMenu === "beranda"
                ? "text-[#008153]"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Beranda
            <span
              className={`absolute bottom-0 left-0 h-[2px] bg-[#008153] transition-all duration-300 ${
                activeMenu === "beranda" ? "w-full" : "w-0"
              }`}
            />
          </button>

          <button
            onClick={() => scrollToSection("tentang")}
            className={`relative py-2 text-[11px] uppercase tracking-widest font-black transition-colors focus:outline-none ${
              activeMenu === "tentang"
                ? "text-[#008153]"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Tentang
            <span
              className={`absolute bottom-0 left-0 h-[2px] bg-[#008153] transition-all duration-300 ${
                activeMenu === "tentang" ? "w-full" : "w-0"
              }`}
            />
          </button>

          <button
            onClick={() => scrollToSection("kuliner")}
            className={`relative py-2 text-[11px] uppercase tracking-widest font-black transition-colors focus:outline-none ${
              activeMenu === "kuliner"
                ? "text-[#008153]"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Kuliner
            <span
              className={`absolute bottom-0 left-0 h-[2px] bg-[#008153] transition-all duration-300 ${
                activeMenu === "kuliner" ? "w-full" : "w-0"
              }`}
            />
          </button>

          {user ? (
            <div className="flex items-center gap-4 pl-4 border-l border-slate-200">
              {user.role === "admin" && (
                <span className="text-[9px] bg-amber-100 text-amber-700 font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                  Admin
                </span>
              )}
              <button
                onClick={handleLogout}
                className="text-[11px] uppercase tracking-widest text-red-500 hover:text-red-700 font-black focus:outline-none transition-all"
              >
                Keluar
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-[#008153] hover:bg-[#006b44] text-white text-[10px] font-black uppercase tracking-widest px-5 py-2.5 rounded-xl transition-all duration-200 shadow-sm"
            >
              Masuk
            </button>
          )}
        </div>

        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden p-2 text-slate-600 focus:outline-none rounded-xl hover:bg-slate-50"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-xl transition-all duration-300 transform origin-top ${
          isMobileOpen
            ? "opacity-100 scale-y-100 pointer-events-auto"
            : "opacity-0 scale-y-0 pointer-events-none"
        }`}
      >
        <div className="px-6 py-6 flex flex-col gap-2 font-black text-[11px] uppercase tracking-widest">
          <button
            onClick={() => scrollToSection("beranda")}
            className={`w-full text-left px-4 py-3 rounded-xl ${
              activeMenu === "beranda"
                ? "bg-slate-50 text-[#008153]"
                : "text-slate-600"
            }`}
          >
            Beranda
          </button>
          <button
            onClick={() => scrollToSection("tentang")}
            className={`w-full text-left px-4 py-3 rounded-xl ${
              activeMenu === "tentang"
                ? "bg-slate-50 text-[#008153]"
                : "text-slate-600"
            }`}
          >
            Tentang
          </button>
          <button
            onClick={() => scrollToSection("kuliner")}
            className={`w-full text-left px-4 py-3 rounded-xl ${
              activeMenu === "kuliner"
                ? "bg-slate-50 text-[#008153]"
                : "text-slate-600"
            }`}
          >
            Kuliner
          </button>

          <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between px-4">
            {user ? (
              <div className="w-full flex items-center justify-between">
                {user.role === "admin" && (
                  <span className="text-[9px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-md">
                    Admin
                  </span>
                )}
                <button
                  onClick={handleLogout}
                  className="text-red-500 font-black"
                >
                  Keluar
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsMobileOpen(false);
                  navigate("/login");
                }}
                className="w-full text-center bg-[#008153] text-white py-3 rounded-xl font-black"
              >
                Masuk
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
