import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { kuliner as initialKuliner } from "../data/kuliner";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function FoodDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [makanan, setMakanan] = useState(null);
  const [loading, setLoading] = useState(true);

  const baseUrl = "https://website-kuliner-banua.vercel.app";

  useEffect(() => {
    const fetchDetailKuliner = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/kuliner/${slug}`);
        if (response.ok) {
          const data = await response.json();
          setMakanan(data);
        } else {
          const savedKuliner = localStorage.getItem("kuliner_data");
          const currentList = savedKuliner
            ? JSON.parse(savedKuliner)
            : initialKuliner;
          const foundData = currentList.find((item) => item.slug === slug);
          setMakanan(foundData || null);
        }
      } catch (error) {
        console.error(error);
        const savedKuliner = localStorage.getItem("kuliner_data");
        const currentList = savedKuliner
          ? JSON.parse(savedKuliner)
          : initialKuliner;
        const foundData = currentList.find((item) => item.slug === slug);
        setMakanan(foundData || null);
      } finally {
        setLoading(false);
      }
    };

    fetchDetailKuliner();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-slate-400 font-medium text-sm animate-pulse uppercase tracking-widest">
          Memuat Detail Kuliner...
        </div>
      </div>
    );
  }

  if (!makanan) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
        <h2 className="text-xl font-black text-slate-900 tracking-tight mb-2 uppercase">
          Kuliner Tidak Ditemukan
        </h2>
        <p className="text-slate-500 text-xs font-medium mb-6 uppercase tracking-wider text-center">
          Maaf, data kuliner yang Anda cari tidak tersedia atau telah dihapus.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-[#008153] hover:bg-[#006b44] text-white text-[10px] font-black uppercase tracking-widest px-5 py-3 rounded-xl transition-all shadow-md"
        >
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased selection:bg-[#008153]/10 selection:text-[#008153]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12">
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-slate-500 hover:text-slate-800 text-xs font-bold uppercase tracking-wider mb-8 transition-colors"
        >
          <svg
            className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Kembali
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-8">
            <div className="aspect-[16/10] rounded-3xl overflow-hidden bg-slate-100 border border-slate-100 shadow-sm relative">
              <img
                src={makanan.image}
                alt={makanan.nama}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">
                {makanan.nama}
              </h1>
              <div className="w-12 h-[3px] bg-[#008153] rounded-full" />
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-3">
                  Sejarah & Asal Usul
                </h3>
                <p className="text-slate-600 text-sm font-medium leading-relaxed whitespace-pre-line">
                  {makanan.sejarah || "Informasi sejarah belum tersedia."}
                </p>
              </div>

              <div className="p-6 bg-[#FDFBF7] border border-amber-100/60 rounded-2xl">
                <h3 className="text-xs font-black text-amber-800 uppercase tracking-widest mb-3">
                  Fakta Menarik
                </h3>
                <p className="text-slate-600 text-sm font-medium leading-relaxed whitespace-pre-line">
                  {makanan.faktaMenarik ||
                    "Informasi fakta menarik belum tersedia."}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 shadow-sm">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
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
      <Footer />
    </div>
  );
}
