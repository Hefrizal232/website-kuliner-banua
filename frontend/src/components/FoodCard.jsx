import { Link } from "react-router-dom";

export default function FoodCard({ makanan }) {
  return (
    <div className="group bg-[#FDFBF7] rounded-3xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(15,23,42,0.02)] border border-amber-100/60 hover:shadow-[0_12px_30px_-8px_rgba(229,169,60,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img
          src={makanan.image}
          alt={makanan.nama}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-slate-900/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1">
          📍 {makanan.asal}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <span className="text-[10px] font-black uppercase tracking-wider text-[#008153] mb-2 block">
          {makanan.kategori}
        </span>

        <h3 className="text-xl font-black text-slate-900 tracking-tight mb-2 group-hover:text-[#008153] transition-colors">
          {makanan.nama}
        </h3>

        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6 flex-grow line-clamp-2">
          {makanan.shortDesc}
        </p>

        <Link
          to={`/kuliner/${makanan.slug}`}
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-700 group-hover:text-white bg-white group-hover:bg-[#008153] px-4 py-2.5 rounded-xl transition-all w-fit mt-auto border border-amber-100/50 group-hover:border-[#E5A93C] group-hover:shadow-md group-hover:shadow-[#E5A93C]/20"
        >
          Baca Selengkapnya
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
  );
}
