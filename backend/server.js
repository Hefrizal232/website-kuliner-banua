import express from "express";
import cors from "cors";
import { supabase } from "./config/supabase.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.post("/api/auth/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email dan password wajib diisi" });
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name || "Admin Kuliner",
          role: "admin",
        },
      },
    });

    if (error) return res.status(400).json({ error: error.message });
    return res
      .status(201)
      .json({ message: "Registrasi berhasil", user: data.user });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email dan password wajib diisi" });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return res.status(400).json({ error: error.message });

    const userPayload = {
      id: data.user.id,
      email: data.user.email,
      name: data.user.user_metadata?.name || "Admin",
      role: data.user.user_metadata?.role || "admin",
    };

    return res.json({
      message: "Login berhasil",
      token: data.session.access_token,
      user: userPayload,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.get("/api/kuliner", async (req, res) => {
  const { data, error } = await supabase
    .from("Kuliner")
    .select("*")
    .order("id", { ascending: false });

  if (error) return res.status(400).json({ error: error.message });
  return res.json(data);
});

app.get("/api/kuliner/:slug", async (req, res) => {
  const { data, error } = await supabase
    .from("Kuliner")
    .select("*")
    .eq("slug", req.params.slug)
    .single();

  if (error) return res.status(404).json({ error: "Kuliner tidak ditemukan" });
  return res.json(data);
});

app.post("/api/kuliner", async (req, res) => {
  try {
    const { nama, asal, kategori, image, shortDesc, sejarah, faktaMenarik } =
      req.body;

    if (!nama || nama.trim() === "") {
      return res
        .status(400)
        .json({ error: "Nama kuliner tidak terbaca oleh server" });
    }

    const safeNama = nama.trim();
    const baseSlug = safeNama
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    const uniqueSlug = `${baseSlug}-${Date.now()}`;

    const { data, error } = await supabase
      .from("Kuliner")
      .insert([
        {
          nama: safeNama,
          slug: uniqueSlug,
          asal: asal || "Kalimantan Selatan",
          kategori: kategori || "Makanan Utama",
          image:
            image ||
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
          shortDesc: shortDesc || "Kuliner khas tradisional.",
          sejarah: sejarah || "Kuliner khas tradisional warisan leluhur.",
          faktaMenarik: faktaMenarik || "Kuliner khas yang sangat digemari.",
        },
      ])
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(201).json(data[0]);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.delete("/api/kuliner/:id", async (req, res) => {
  const { error } = await supabase
    .from("Kuliner")
    .delete()
    .eq("id", req.params.id);

  if (error) return res.status(400).json({ error: error.message });
  return res.json({ message: "Kuliner berhasil dihapus" });
});

app.post("/api/saran", async (req, res) => {
  const { nama, pesan } = req.body;
  const { data, error } = await supabase
    .from("kritik_saran")
    .insert([{ nama: nama || "Anonim", pesan }])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  return res.status(201).json(data[0]);
});

app.get("/api/saran", async (req, res) => {
  const { data, error } = await supabase
    .from("kritik_saran")
    .select("*")
    .order("id", { ascending: false });

  if (error) return res.status(400).json({ error: error.message });
  return res.json(data);
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running locally on port ${PORT}`);
  });
}

module.exports = app;
