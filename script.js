// 1. Durasi hitung mundur dalam milidetik (2 Jam = 2 * 60 * 60 * 1000)
const COUNTDOWN_DURATION = 2 * 60 * 60 * 1000;

// Fungsi utama penggerak mesin waktu
function startTimer() {
  let targetTime = localStorage.getItem("countdown_target_time");
  const now = new Date().getTime();

  // Jika memori kosong ATAU waktu target sebelumnya sudah terlewati, buat target baru
  if (!targetTime || parseInt(targetTime) <= now) {
    targetTime = now + COUNTDOWN_DURATION;
    localStorage.setItem("countdown_target_time", targetTime);
  } else {
    targetTime = parseInt(targetTime);
  }

  // Jalankan pembaruan data angka setiap 1 detik secara real-time
  const timerInterval = setInterval(function () {
    const currentTime = new Date().getTime();
    const distance = targetTime - currentTime;

    // Kalkulasi matematika konversi waktu
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Format angka agar selalu dua digit (contoh: 05, 09, dst)
    const formattedHours = hours < 10 ? "0" + hours : hours;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

    // Suntikkan angka ke elemen tampilan HTML
    document.getElementById("countdown-hours").innerHTML = formattedHours;
    document.getElementById("countdown-minutes").innerHTML = formattedMinutes;
    document.getElementById("countdown-seconds").innerHTML = formattedSeconds;

    // KOTAK RESTART OTOMATIS: Jika waktu tepat menyentuh angka 0
    if (distance <= 0) {
      clearInterval(timerInterval); // Matikan mesin interval lama
      localStorage.removeItem("countdown_target_time"); // Bersihkan memori lama

      // Berikan jeda 1 detik agar transisi pergantian siklus terasa halus
      setTimeout(function () {
        startTimer();
      }, 1000);
    }
  }, 1000);
}

// Picu jalannya fungsi saat halaman pertama kali dibuka
startTimer();
