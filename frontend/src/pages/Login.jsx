import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login({ setUser }) {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const baseUrl = "https://website-kuliner-banua.vercel.app";
    const endpoint = isRegister
      ? `${baseUrl}/api/auth/register`
      : `${baseUrl}/api/auth/login`;

    const payload = isRegister
      ? { name, email, password }
      : { email, password };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        if (isRegister) {
          alert(
            "Registrasi Berhasil! Silakan masuk menggunakan akun baru Anda.",
          );
          setIsRegister(false);
          setName("");
          setPassword("");
        } else {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user_role", data.user.role);
          localStorage.setItem("is_logged_in", "true");

          setUser({
            role: data.user.role,
            name: data.user.name,
            email: data.user.email,
          });

          alert(`Selamat datang kembali, ${data.user.name}!`);
          navigate("/");
        }
      } else {
        alert(data.error || "Terjadi kesalahan pada sistem autentikasi.");
      }
    } catch (error) {
      console.error("Auth error:", error);
      alert("Gagal terhubung ke server auth.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white">
      <div className="hidden lg:flex lg:w-1/2 bg-[#008153] p-16 flex-col justify-between text-white relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-5xl font-black tracking-tight mb-4 uppercase">
            Kuliner Banua
          </h1>
          <p className="text-emerald-100 font-medium max-w-md text-sm leading-relaxed">
            Arsip digital ragam cita rasa tradisional Kalimantan Selatan. Masuk
            ke panel untuk mengelola konten budaya lokal.
          </p>
        </div>
        <div className="relative z-10 text-xs font-bold uppercase tracking-widest text-emerald-200">
          © 2026 Portal Admin Kuliner Banua
        </div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-emerald-700/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-16 relative">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase mb-2">
              {isRegister ? "Buat Akun Admin" : "Log In Admin"}
            </h2>
            <p className="text-slate-400 font-medium text-sm">
              {isRegister
                ? "Daftarkan diri Anda untuk mengelola arsip kuliner."
                : "Silakan masukkan kredensial Anda untuk masuk ke sistem."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <input
                type="text"
                placeholder="Nama Lengkap"
                value={name}
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-[#008153] focus:ring-1 focus:ring-[#008153] outline-none transition-all text-sm"
                onChange={(e) => setName(e.target.value)}
                required
              />
            )}
            <input
              type="email"
              placeholder="Alamat Email"
              value={email}
              className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-[#008153] focus:ring-1 focus:ring-[#008153] outline-none transition-all text-sm"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Kata Sandi"
              value={password}
              className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-[#008153] focus:ring-1 focus:ring-[#008153] outline-none transition-all text-sm"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-[#008153] hover:bg-[#006b44] text-white py-4 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-[#008153]/20 uppercase tracking-wider"
            >
              {isRegister ? "Daftar Sekarang" : "Masuk ke Akun"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-500 font-medium text-sm">
              {isRegister ? "Sudah punya akun?" : "Belum punya akun?"}{" "}
              <button
                type="button"
                onClick={() => {
                  setIsRegister(!isRegister);
                  setName("");
                  setEmail("");
                  setPassword("");
                }}
                className="text-[#008153] font-black hover:underline"
              >
                {isRegister ? "Masuk di sini" : "Daftar sekarang"}
              </button>
            </p>
            <Link
              to="/"
              className="block mt-6 text-xs font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest transition-colors"
            >
              ← Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
