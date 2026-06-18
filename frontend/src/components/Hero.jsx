import { kuliner } from "../data/kuliner";

export default function Hero() {
  const fotoSoto = kuliner[0]?.image;
  const fotoKetupat = kuliner[1]?.image;
  const fotoBingka = kuliner[5]?.image;

  return (
    <section className="relative bg-gradient-to-b from-[#F8FAFC] to-white overflow-hidden pt-12 pb-20 lg:py-24">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#E5A93C]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#008153]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 z-10 text-center lg:text-left flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200/60 px-4 py-2 rounded-2xl w-fit mb-6 shadow-xs mx-auto lg:mx-0">
            <span className="text-xs font-black uppercase tracking-widest text-[#008153]">
              Warisan Kuliner Khas Kalsel
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.05] tracking-tight">
            Menjelajahi Cita Rasa <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#008153] to-[#E5A93C]">
              Autentik Banua
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium mt-6 max-w-xl mx-auto lg:mx-0">
            Temukan kekayaan kuliner tradisional Kalimantan Selatan yang kaya
            akan rempah-rempah eksotis, warisan sejarah Kesultanan, dan tradisi
            turun-temurun.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <a
              href="#unggulan"
              className="bg-[#008153] hover:bg-[#008153] text-white font-black text-sm uppercase tracking-wider px-8 py-4 rounded-2xl shadow-lg shadow-[#E5A93C]/20 hover:shadow-xl hover:shadow-[#E5A93C]/30 hover:-translate-y-0.5 transition-all duration-200 text-center"
            >
              Jelajahi Kuliner
            </a>
            <a
              href="#tentang"
              className="bg-white hover:bg-slate-50 text-slate-700 font-black text-sm uppercase tracking-wider px-8 py-4 rounded-2xl border-2 border-slate-200/80 hover:border-slate-300 transition-all duration-200 text-center"
            >
              Pelajari Sejarah
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 relative h-[380px] sm:h-[450px] w-full mt-10 lg:mt-0 select-none">
          <div className="absolute top-4 left-6 w-2/3 h-2/3 rounded-3xl overflow-hidden shadow-2xl border-4 border-white -rotate-3 z-20 transition-transform duration-500 hover:rotate-0">
            <img
              src={fotoSoto}
              alt="Soto Banjar"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="absolute bottom-4 right-4 w-1/2 h-1/2 rounded-3xl overflow-hidden shadow-2xl border-4 border-white rotate-6 z-30 transition-transform duration-500 hover:rotate-0">
            <img
              src={fotoKetupat}
              alt="Ketupat Kandangan"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="absolute top-16 right-12 w-1/3 h-1/3 rounded-2xl overflow-hidden shadow-md border-2 border-white/50 opacity-40 blur-[0.5px] rotate-12 z-10">
            <img
              src={fotoBingka}
              alt="Bingka Banjar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
