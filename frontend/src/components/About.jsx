export default function About() {
  return (
    <section id="tentang" className="max-w-7xl mx-auto px-6 py-16">
      <div className="bg-[#008153] rounded-[2rem] text-white p-8 md:p-16 relative overflow-hidden shadow-xl shadow-[#008153]/10">
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/5 rounded-full pointer-events-none" />
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#E5A93C]/10 rounded-full pointer-events-none" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#E5A93C] block mb-3">
            Nusantara Heritage
          </span>
          <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">
            Tentang Kuliner Banjar
          </h2>
          <p className="text-base md:text-lg text-emerald-50/90 leading-relaxed font-medium">
            Kuliner Kalimantan Selatan merupakan bagian penting dari budaya
            masyarakat Banjar yang kaya akan rempah-rempah dan tradisi
            turun-temurun. Berbagai makanan khas seperti Soto Banjar, Ketupat
            Kandangan, dan Bingka Banjar menjadi ikon kuliner yang dikenal
            hingga ke berbagai daerah di Indonesia.
          </p>
        </div>
      </div>
    </section>
  );
}
