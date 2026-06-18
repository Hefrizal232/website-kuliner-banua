import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { kuliner as initialKuliner } from "../data/kuliner";

export default function FoodDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [makanan, setMakanan] = useState(null);

  useEffect(() => {
    const savedKuliner = localStorage.getItem("kuliner_data");
    const currentList = savedKuliner
      ? JSON.parse(savedKuliner)
      : initialKuliner;

    const foundData = currentList.find((item) => item.slug === slug);
    if (foundData) {
      setMakanan(foundData);
    }
  }, [slug]);

  if (!makanan) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
        <p className="text-slate-400 text-sm font-bold mb-4 uppercase tracking-widest">
          Data Kuliner Tidak Ditemukan
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-[#008153] text-white text-xs font-black uppercase tracking-widest px-6 py-3 rounded-xl"
        >
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased selection:bg-[#008153]/10 selection:text-[#008153]">
      <div className="relative h-[45vh] w-full bg-slate-950">
        <img
          src={makanan.image}
          alt={makanan.nama}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />

        <button
          onClick={() => navigate("/")}
          className="absolute top-6 left-6 sm:left-12 bg-white/90 backdrop-blur-md hover:bg-white text-slate-800 text-[10px] font-black uppercase tracking-widest px-4 py-2.5 rounded-xl border border-slate-200/50 shadow-md transition-all flex items-center gap-2"
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Kembali ke Beranda
        </button>

        <div className="absolute bottom-6 left-6 sm:left-12 right-6">
          <span className="bg-[#008153] text-white text-[9px] font-black px-2.5 py-1 rounded-md tracking-wider uppercase mb-2 inline-block">
            {makanan.kategori || "Makanan Utama"}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight uppercase">
            {makanan.nama}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-4 bg-[#008153] rounded-full inline-block" />
                Sejarah & Asal Usul
              </h2>
              <p className="text-sm text-slate-600 font-medium leading-relaxed text-justify">
                {makanan.sejarah}
              </p>
            </div>

            {makanan.faktaMenarik && (
              <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
                <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-[#E5A93C] rounded-full inline-block" />
                  Fakta Menarik
                </h2>
                <p className="text-sm text-slate-600 font-medium leading-relaxed text-justify">
                  {makanan.faktaMenarik}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-[#FDFBF7] border border-amber-100/60 rounded-3xl p-6">
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">
                Informasi Singkat
              </h3>
              <div className="space-y-4 text-xs font-bold">
                <div>
                  <span className="text-slate-400 block mb-1 text-[10px] uppercase tracking-wider">
                    Asal Daerah
                  </span>
                  <span className="text-slate-800 bg-white px-3 py-1.5 rounded-lg border border-slate-200 inline-block">
                    {makanan.asal}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-1 text-[10px] uppercase tracking-wider">
                    Kategori Kuliner
                  </span>
                  <span className="text-slate-800 bg-white px-3 py-1.5 rounded-lg border border-slate-200 inline-block">
                    {makanan.kategori || "Makanan Utama"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-1 text-[10px] uppercase tracking-wider">
                    Karakteristik
                  </span>
                  <p className="text-slate-600 font-medium leading-relaxed bg-white p-3 rounded-xl border border-slate-200">
                    {makanan.shortDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
