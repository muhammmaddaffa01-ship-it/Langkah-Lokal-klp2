// ===== SE 1: data paket + perhitungan dasar =====
const HARGA_PAKET = {
  kota: { nama: "Langkah Kota", harga: 125000 },
  rimba: { nama: "Langkah Rimba", harga: 175000 },
  rasa: { nama: "Langkah Rasa", harga: 150000 },
};

// ===== SE 2: aturan promo =====
const KODE_PROMO = "LANGKAH10";
const PERSEN_DISKON = 10;

function formatRupiah(angka) {
  return "Rp" + angka.toLocaleString("id-ID");
}

function hitungHarga() {
  const kodePaket = document.getElementById("paket").value;
  const jumlah = parseInt(document.getElementById("jumlah").value, 10);
  const kodeInput = document
    .getElementById("kode-promo")
    .value.trim()
    .toUpperCase();
  const hasil = document.getElementById("hasil");

  // validasi jumlah peserta
  if (isNaN(jumlah) || jumlah < 1) {
    hasil.innerHTML = "<p class='error'>Jumlah peserta minimal 1 ya.</p>";
    return;
  }

  // SE 1: harga awal = harga paket x jumlah peserta
  const paket = HARGA_PAKET[kodePaket];
  const hargaAwal = paket.harga * jumlah;

  // SE 2: cek kode promo (if - else)
  let diskon = 0;
  let pesanPromo = "";

  if (kodeInput === "") {
    pesanPromo = "Tidak memakai kode promo.";
  } else if (kodeInput === KODE_PROMO) {
    diskon = hargaAwal * (PERSEN_DISKON / 100);
    pesanPromo = "Kode promo " + KODE_PROMO + " berhasil dipakai (diskon " + PERSEN_DISKON + "%).";
  } else {
    pesanPromo = "Kode promo tidak valid, diskon tidak diberikan.";
  }

  const totalBayar = hargaAwal - diskon;

  // tampilkan rincian ke halaman
  hasil.innerHTML =
    "<h3>Rincian Pembayaran</h3>" +
    "<p>Paket: " + paket.nama + " (" + formatRupiah(paket.harga) + " x " + jumlah + " peserta)</p>" +
    "<p>Harga awal: " + formatRupiah(hargaAwal) + "</p>" +
    "<p>Potongan diskon: " + formatRupiah(diskon) + "</p>" +
    "<p class='promo-info'>" + pesanPromo + "</p>" +
    "<p class='total'><strong>Total bayar: " + formatRupiah(totalBayar) + "</strong></p>";
}

document.getElementById("btn-hitung").addEventListener("click", hitungHarga);
