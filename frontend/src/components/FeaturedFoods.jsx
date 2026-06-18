import { useRef, useEffect } from "react";
import { kuliner } from "../data/kuliner";
import { Link } from "react-router-dom";

export default function FeaturedFoods() {
  const sliderRef = useRef(null);
  const autoplayRef = useRef(null);
  const unggulan = kuliner.slice(0, 6);

  const startAutoplay = () => {
    stopAutoplay();
    autoplayRef.current = setInterval(() => {
      if (sliderRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
        const isEnd = scrollLeft + clientWidth >= scrollWidth - 20;

        sliderRef.current.scrollTo({
          left: isEnd ? 0 : scrollLeft + 364,
          behavior: "smooth",
        });
      }
    }, 1500);
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, []);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const { scrollLeft } = sliderRef.current;
      const scrollTo =
        direction === "left" ? scrollLeft - 364 : scrollLeft + 364;
      sliderRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section
      id="unggulan"
      className="max-w-7xl mx-auto px-6 py-20 overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-[#008153] block mb-2">
            Rekomendasi Terbaik
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] tracking-tight">
            Kuliner Unggulan Banua
          </h2>
        </div>
        <div className="flex gap-2.5">
          <button
            onClick={() => scroll("left")}
            className="w-12 h-12 rounded-full border border-slate-200 bg-white text-slate-700 flex items-center justify-center hover:bg-[#008153] hover:text-white hover:border-[#008153] transition-all shadow-xs active:scale-95 cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-12 h-12 rounded-full border border-slate-200 bg-white text-slate-700 flex items-center justify-center hover:bg-[#008153] hover:text-white hover:border-[#008153] transition-all shadow-xs active:scale-95 cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={sliderRef}
        onMouseEnter={stopAutoplay}
        onMouseLeave={startAutoplay}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 -mx-6 px-6"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {unggulan.map((item) => (
          <div
            key={item.id}
            className="flex-none w-[290px] sm:w-[340px] snap-start"
          >
            <div className="group relative h-[480px] rounded-[2.5rem] overflow-hidden bg-slate-950 shadow-md hover:shadow-2xl transition-all duration-500">
              <img
                src={item.image}
                alt={item.nama}
                className="w-full h-full object-cover transition-all duration-700 scale-100 group-hover:scale-110 opacity-80 group-hover:opacity-70"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/40 to-transparent transition-all duration-500 group-hover:from-slate-950 group-hover:via-slate-950/70" />

              <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold tracking-wider px-3 py-1.5 rounded-full uppercase transition-all duration-300 group-hover:bg-[#008153] group-hover:border-[#008153]">
                📍 {item.asal}
              </div>

              <div className="absolute bottom-0 left-0 p-8 w-full transition-all duration-500 transform translate-y-10 group-hover:translate-y-0">
                <span className="text-[10px] font-black text-[#E5A93C] uppercase tracking-widest block mb-1">
                  {item.kategori}
                </span>

                <h3 className="text-2xl font-black mb-3 tracking-tight text-white group-hover:text-[#E5A93C] transition-colors leading-tight">
                  {item.nama}
                </h3>

                <p className="text-slate-300 text-xs leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-all duration-500 line-clamp-2">
                  {item.shortDesc}
                </p>

                <div className="opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <Link
                    to={`/kuliner/${item.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-black tracking-wider uppercase text-white bg-[#008153] hover:bg-[#006b44] px-5 py-3 rounded-xl shadow-lg transition-all"
                  >
                    Lihat Detail
                    <svg
                      className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
