import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import FeaturedFoods from "../components/FeaturedFoods";
import FoodCard from "../components/FoodCard";
import Footer from "../components/Footer";
import { kuliner as initialKuliner } from "../data/kuliner";

export default function Home({ user, setUser }) {
  const [kulinerList, setKulinerList] = useState([]);
  const [saranList, setSaranList] = useState([]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [namaMakanan, setNamaMakanan] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [image, setImage] = useState("");
  const [asal, setAsal] = useState("");
  const [kategori, setKategori] = useState("Makanan Utama");
  const [sejarah, setSejarah] = useState("");
  const [faktaMenarik, setFaktaMenarik] = useState("");

  const [nama, setNama] = useState("");
  const [pesan, setPesan] = useState("");

  useEffect(() => {
    const fetchKuliner = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/kuliner");
        if (res.ok) {
          const data = await res.json();
          setKulinerList([...data, ...initialKuliner]);
        } else {
          setKulinerList(initialKuliner);
        }
      } catch (err) {
        console.error(err);
        setKulinerList(initialKuliner);
      }
    };

    const fetchSaran = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/saran");
        if (res.ok) {
          const data = await res.json();
          setSaranList(data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchKuliner();
    fetchSaran();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddKuliner = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/kuliner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nama: namaMakanan,
          asal: asal,
          kategori: kategori,
          image: image,
          shortDesc: shortDesc,
          sejarah: sejarah,
          faktaMenarik: faktaMenarik,
        }),
      });

      if (response.ok) {
        const dataBaru = await response.json();
        setKulinerList([dataBaru, ...kulinerList]);
        setNamaMakanan("");
        setShortDesc("");
        setImage("");
        setAsal("");
        setKategori("Makanan Utama");
        setSejarah("");
        setFaktaMenarik("");
        setShowAddForm(false);
        alert("Kuliner baru berhasil ditambahkan!");
      } else {
        const errorData = await response.json();
        alert(
          `Gagal menambahkan: ${errorData.error || "Terjadi kesalahan server"}`,
        );
      }
    } catch (error) {
      console.error(error);
      alert("Gagal terhubung ke backend server.");
    }
  };

  const handleDeleteKuliner = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus kuliner ini?")) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/kuliner/${id}`,
          {
            method: "DELETE",
          },
        );

        if (response.ok) {
          const updatedKuliner = kulinerList.filter((item) => item.id !== id);
          setKulinerList(updatedKuliner);
          alert("Kuliner berhasil dihapus!");
        } else {
          alert("Gagal menghapus kuliner di database.");
        }
      } catch (error) {
        console.error(error);
        alert("Gagal terhubung ke backend server.");
      }
    }
  };

  const handleSubmitSaran = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/saran", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nama: nama || "Anonim",
          pesan: pesan,
        }),
      });

      if (response.ok) {
        const dataBaru = await response.json();
        setSaranList([dataBaru, ...saranList]);
        setNama("");
        setPesan("");
        alert("Kritik dan saran kamu berhasil dikirim!");
      } else {
        alert("Gagal mengirim data ke server.");
      }
    } catch (error) {
      console.error(error);
      alert("Gagal terhubung ke backend server.");
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased selection:bg-[#008153]/10 selection:text-[#008153]">
      <Navbar user={user} setUser={setUser} />

      <div id="beranda">
        <Hero />
      </div>

      <div id="kuliner-unggulan">
        <FeaturedFoods />
      </div>

      <div id="tentang">
        <About />
      </div>

      <div id="daftar-kuliner">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 py-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight inline-block relative pb-4 uppercase">
              Daftar Kuliner Tradisional
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[3px] bg-[#008153] rounded-full" />
            </h2>
          </div>

          {user?.role === "admin" && (
            <div className="flex justify-center mb-12">
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-[#008153] hover:bg-[#006b44] text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-xl transition-all shadow-md"
              >
                {showAddForm ? "Tutup Form" : "Tambah Kuliner Baru"}
              </button>
            </div>
          )}

          {showAddForm && user?.role === "admin" && (
            <div className="max-w-xl mx-auto mb-12 p-8 bg-slate-50 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="text-xl font-black text-slate-900 tracking-tight mb-6 text-center uppercase">
                Form Tambah Kuliner
              </h3>
              <form onSubmit={handleAddKuliner} className="space-y-4">
                <input
                  type="text"
                  placeholder="Nama Kuliner"
                  required
                  value={namaMakanan}
                  onChange={(e) => setNamaMakanan(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#008153] outline-none text-sm"
                />
                <input
                  type="text"
                  placeholder="Asal Daerah (Contoh: Banjarmasin)"
                  value={asal}
                  onChange={(e) => setAsal(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#008153] outline-none text-sm"
                />
                <select
                  value={kategori}
                  onChange={(e) => setKategori(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#008153] outline-none text-sm"
                >
                  <option value="Makanan Utama">Makanan Utama</option>
                  <option value="Kue Tradisional">Kue Tradisional</option>
                  <option value="Minuman">Minuman</option>
                </select>
                <div className="w-full">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Upload Foto Kuliner
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-[#008153] outline-none text-xs file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 file:cursor-pointer"
                  />
                </div>
                <textarea
                  placeholder="Karakteristik"
                  required
                  rows="2"
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#008153] outline-none text-sm resize-none"
                />
                <textarea
                  placeholder="Sejarah & Asal Usul Kuliner"
                  rows="3"
                  value={sejarah}
                  onChange={(e) => setSejarah(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#008153] outline-none text-sm resize-none"
                />
                <textarea
                  placeholder="Fakta Menarik Kuliner"
                  rows="2"
                  value={faktaMenarik}
                  onChange={(e) => setFaktaMenarik(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#008153] outline-none text-sm resize-none"
                />
                <button
                  type="submit"
                  className="w-full bg-[#008153] text-white text-xs font-black uppercase tracking-widest py-3.5 rounded-xl hover:bg-[#006b44] transition-colors"
                >
                  Simpan ke Daftar
                </button>
              </form>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {kulinerList.map((makanan) => (
              <div key={makanan.id} className="relative group">
                <FoodCard makanan={makanan} />
                {user?.role === "admin" && (
                  <button
                    onClick={() => handleDeleteKuliner(makanan.id)}
                    className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2.5 rounded-xl transition-all shadow-md z-30"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        id="kritik-saran"
        className="max-w-7xl mx-auto px-6 sm:px-12 py-16 border-t border-slate-100"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="bg-[#FDFBF7] p-8 rounded-3xl border border-amber-100/60">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2 uppercase">
              Kritik & Saran
            </h2>
            <p className="text-slate-500 text-sm mb-6 font-medium">
              Bantu kami mengembangkan platform ini dengan memberikan masukan
              atau ulasan terbaik kamu.
            </p>

            <form onSubmit={handleSubmitSaran} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Nama Kamu (Opsional)"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className="w-full px-5 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#008153] outline-none transition-all text-sm"
                />
              </div>
              <div>
                <textarea
                  placeholder="Tulis kritik atau saran di sini..."
                  required
                  rows="4"
                  value={pesan}
                  onChange={(e) => setPesan(e.target.value)}
                  className="w-full px-5 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#008153] outline-none transition-all text-sm resize-none"
                />
              </div>
              <button
                type="submit"
                className="bg-[#008153] hover:bg-[#006b44] text-white text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-xl transition-all shadow-md shadow-[#008153]/10"
              >
                Kirim Masukan
              </button>
            </form>
          </div>

          <div>
            {user?.role === "admin" ? (
              <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">
                    Kotak Masuk Admin
                  </h3>
                  <span className="bg-amber-100 text-amber-700 text-[10px] font-black px-2 py-1 rounded-md uppercase">
                    {saranList.length} Pesan
                  </span>
                </div>

                {saranList.length === 0 ? (
                  <p className="text-slate-400 text-sm font-medium py-4 text-center">
                    Belum ada kritik atau saran yang masuk.
                  </p>
                ) : (
                  <div className="space-y-4 max-h-[320px] overflow-y-auto pr-2">
                    {saranList.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-2xl bg-slate-50 border border-slate-100"
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-sm text-slate-800">
                            {item.nama}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium">
                            {item.created_at
                              ? new Date(item.created_at).toLocaleDateString(
                                  "id-ID",
                                )
                              : item.tanggal}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 font-medium leading-relaxed">
                          {item.pesan}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full flex flex-col justify-center p-8 text-center lg:text-left">
                <h3 className="text-xl font-black text-slate-900 mb-4 uppercase">
                  Suara Pengunjung
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                  Setiap ulasan, masukan, kritik, maupun saran yang kamu berikan
                  sangat berharga bagi pengelolaan data arsip kuliner
                  tradisional Banua agar tetap lestari dan terjaga dengan baik.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
