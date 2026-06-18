import express from "express";
import cors from "cors";
import { supabase } from "./config/supabase.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get("/api/kuliner", async (req, res) => {
  const { data, error } = await supabase
    .from("kuliner")
    .select("*")
    .order("id", { ascending: false });

  if (error) return res.status(400).json({ error: error.message });
  return res.json(data);
});

app.get("/api/kuliner/:slug", async (req, res) => {
  const { data, error } = await supabase
    .from("kuliner")
    .select("*")
    .eq("slug", req.params.slug)
    .single();

  if (error) return res.status(404).json({ error: "Kuliner tidak ditemukan" });
  return res.json(data);
});

app.post("/api/kuliner", async (req, res) => {
  const { nama, asal, kategori, image, shortDesc, sejarah, faktaMenarik } =
    req.body;
  const slug = nama.toLowerCase().replace(/ /g, "-");

  const { data, error } = await supabase
    .from("kuliner")
    .insert([
      { nama, slug, asal, kategori, image, shortDesc, sejarah, faktaMenarik },
    ])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  return res.status(201).json(data[0]);
});

app.delete("/api/kuliner/:id", async (req, res) => {
  const { error } = await supabase
    .from("kuliner")
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
app.listen(PORT, () => console.log(`Server berjalan lancar di port ${PORT}`));
