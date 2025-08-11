import { calculateStatus } from "./calculate-status.utils";

export function getSuggestionAdvices(z_score: number) {
  const status = calculateStatus(z_score);

  switch (status) {
    case "thinnes":
      return [
        "Tingkatkan asupan kalori harian dengan makanan pokok + lauk hewani dan nabati.",
        "Sediakan camilan sehat tinggi energi seprti pisang, kacang, ubi, atau roti selai kacang.",
        "Tambahkan sumber protein lengkap di setiap makan (telur, ikan, ayam, susu).",
        "Pemberian vitamin dan mineral sesuai rekomendasi (vitamin A, zat besi, seng).",
        "Pantau pertumbuhan setiap bulan untuk memastikan perbaikan status gizi.",
      ];
    case "overweight":
      return [
        "Kurangi asupan gula sederhana (minuman manis, kue, permen).",
        "Perbanyak porsi sayur dan buah dalam setiap makan untuk membantu rasa kenyang.",
        "Pilih sumber protein rendah lemak seperti ikan, ayam tanpa kulit, tahu, tempe.",
        "Atur porsi makan menggunakan piring terkontrol (setengah sayur, seperempat protein, seperempat karbohidrat).",
        "Tingkatkan aktivitas fisik rutin untuk membantu pengendalian berat badan.",
      ];
    case "obese":
      return [
        "Hindari minuman manis dan makanan tinggi kalori rendah gizi.",
        "Terapkan pola makan defisit kalori sehat, tapi tetap bergizi lengkap.",
        "Fokus pada karbohidrat kompleks (nasi merah, oat, singkong) dan hindari karbohidrat olahan.",
        "Lakukan olahraga teratur (minimal 60 menit aktivitas sedang per hari untuk anak, 150 menit/minggu untuk dewasa).",
        "Lakukan pemantauan berat badan dan lingkar pinggang secara rutin untuk memantau progres.",
      ];
    default:
      return [
        "Pertahankan pola makan seimbang (karbohidrat kompleks, protein cukup, lemak sehat).",
        "Konsumsi sayur dan buah beragam warna setiap hari.",
        "Batasi makanan ultra-proses dan minuman manis.",
        "Minum air putih cukup sesuai kebutuhan tubuh.",
        "Tetap aktif secara fisik (olahraga atau aktivitas ringan harian).",
      ];
  }
}
