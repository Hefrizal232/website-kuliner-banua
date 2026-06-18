import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login({ setUser }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "admin@kulinerbanua.com" && password === "admin123") {
      localStorage.setItem("user_role", "admin");
      localStorage.setItem("is_logged_in", "true");
      setUser({ role: "admin" });
      navigate("/");
    } else if (email === "guest@kulinerbanua.com" && password === "guest123") {
      localStorage.setItem("user_role", "guest");
      localStorage.setItem("is_logged_in", "true");
      setUser({ role: "guest" });
      navigate("/");
    } else {
      alert("Email atau password salah!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white">
      <div className="hidden lg:flex lg:w-1/2 bg-[#008153] p-16 flex-col justify-between text-white relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-5xl font-black mb-6">Kuliner Banua</h1>
          <p className="text-emerald-50 text-lg max-w-md font-medium">
            Jelajahi, nikmati, dan lestarikan warisan kuliner legendaris
            Kalimantan Selatan.
          </p>
        </div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              {isRegister ? "Buat Akun Baru" : "Selamat Datang"}
            </h2>
            <p className="text-slate-400 mt-2 font-medium">
              {isRegister
                ? "Silakan isi detail untuk mendaftar"
                : "Masuk dengan akun terdaftar"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              placeholder="Alamat Email"
              className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-[#008153] focus:ring-1 focus:ring-[#008153] outline-none transition-all"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Kata Sandi"
              className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-[#008153] focus:ring-1 focus:ring-[#008153] outline-none transition-all"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="w-full bg-[#008153] hover:bg-[#006b44] text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-[#008153]/20">
              {isRegister ? "Daftar Sekarang" : "Masuk ke Akun"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-500 font-medium">
              {isRegister ? "Sudah punya akun?" : "Belum punya akun?"}{" "}
              <button
                onClick={() => setIsRegister(!isRegister)}
                className="text-[#008153] font-black hover:underline"
              >
                {isRegister ? "Masuk di sini" : "Daftar sekarang"}
              </button>
            </p>
            <Link
              to="/"
              className="block mt-6 text-slate-400 font-bold hover:text-slate-900 text-sm uppercase tracking-wider"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
