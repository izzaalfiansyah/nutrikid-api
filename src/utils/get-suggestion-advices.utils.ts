import { calculateStatus } from "./calculate-status.utils";

export function getSuggestionAdvices(z_score: number) {
  const status = calculateStatus(z_score);

  switch (status) {
    case "emaciated":
      return [
        "Tingkatkan asupan energi & protein (susu full cream, telur, ikan, ayam, daging, tempe, tahu).",
        "Perbanyak makanan padat gizi seperti kacang-kacangan, alpukat, keju, yogurt.",
        "Berikan 3 kali makan utama + 2–3 kali snack sehat setiap hari.",
        "Gunakan fortifikasi (misalnya bubur diperkaya susu, minyak, atau santan) untuk meningkatkan kalori.",
        "Pantau pertumbuhan tiap bulan dan konsultasi dengan tenaga kesehatan.",
      ];
    case "thinnes":
      return [
        "Tingkatkan porsi makan secara bertahap, fokus pada protein hewani dan lemak sehat.",
        "Perbanyak sumber karbohidrat kompleks (nasi, roti gandum, kentang, ubi).",
        "Susu atau produk olahan susu 2–3 kali sehari.",
        "Berikan cemilan sehat kaya kalori (smoothie buah + susu, roti isi selai kacang).",
      ];
    case "overweight":
      return [
        "Kurangi makanan tinggi gula (minuman manis, kue, permen) dan gorengan.",
        "Tingkatkan konsumsi sayur & buah.",
        "Gunakan metode piring makan sehat (½ sayur & buah, ¼ protein, ¼ karbohidrat).",
        "Pilih camilan rendah kalori tapi mengenyangkan (popcorn tanpa mentega, buah potong).",
        "Dorong aktivitas fisik lebih banyak daripada waktu layar.",
      ];
    case "obese":
      return [
        "Batasi total asupan kalori harian sesuai usia & kebutuhan.",
        "Hindari minuman manis & fast food.",
        "Tingkatkan makanan tinggi serat (sayur, buah, kacang-kacangan).",
        "Gunakan teknik mindful eating (makan pelan, berhenti sebelum kenyang).",
        "Aktivitas fisik terstruktur (berenang, bersepeda, jalan cepat) minimal 60 menit/hari.",
        "Konsultasi gizi & kesehatan untuk monitoring berkala.",
      ];
    default:
      return [
        "Terapkan prinsip gizi semibang (Karbohidrat 50-60% energi, Protein 10-15% energi, Lemak sehat 25-30% energi).",
        "Variasikan menu (sayur, buah, lauk nabati dan hewani).",
        "Batasi makanan tinggi gula, garam, dan lemak jenuh.",
        "Aktifitas fisik rutin minimal 60 menit/hari.",
      ];
  }
}
