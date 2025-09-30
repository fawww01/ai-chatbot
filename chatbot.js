function toggleChat() {
  const bot = document.getElementById("chatbot");
  bot.style.display = bot.style.display === "flex" ? "none" : "flex";
}

function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (message === "") return;

  appendMessage("user", message);
  input.value = "";

  setTimeout(() => {
    getBotResponse(message);
  }, 600);
}

function appendMessage(sender, text) {
  const chat = document.getElementById("chat-messages");
  const msg = document.createElement("div");
  msg.className = `message ${sender}`;
  msg.textContent = text;
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

function getBotResponse(message) {
  const lower = message.toLowerCase();
  let response = "Maaf, saya belum mengerti maksud pertanyaanmu.";

  // === SAPAAN DAN UMUM ===
  if (lower.includes("halo") || lower.includes("hai")) {
    response = "Halo! Saya di sini untuk membantu. Tanyakan apa saja.";
  } else if (lower.includes("terima kasih")) {
    response = "Sama-sama! 😊";
  } else if (lower.includes("siapa kamu") || lower.includes("kamu siapa")) {
    response = "Saya adalah Asisten AI SPP dan pertanyaan umum lainnya.";
  
  // === PERTANYAAN SPP ===
  } else if (lower.includes("spp")) {
    response = "Pembayaran SPP dilakukan tiap awal bulan. Silakan cek menu Pembayaran.";
  } else if (lower.includes("riwayat")) {
    response = "Riwayat pembayaran bisa kamu lihat di menu Riwayat SPP.";

  // === JAM / WAKTU ===
  } else if (lower.includes("jam berapa") || lower.includes("pukul berapa") || lower.includes("waktu sekarang")) {
    const now = new Date();
    response = `Sekarang pukul ${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}`;
  
  // === MATEMATIKA SEDERHANA ===
  } else if (lower.match(/\d+\s*[\+\-\*\/]\s*\d+/)) {
    try {
      const result = eval(lower.match(/\d+\s*[\+\-\*\/]\s*\d+/)[0]);
      response = `Hasilnya adalah ${result}`;
    } catch {
      response = "Maaf, saya tidak bisa menghitung itu.";
    }

  // === PERTANYAAN LAINNYA ===
  } else if (lower.includes("cuaca")) {
    response = "Saat ini saya belum terhubung ke cuaca online. Tapi saya bisa bantu soal lainnya!";
  } else if (lower.includes("nama saya siapa")) {
    response = "Maaf, saya tidak bisa melihat nama kamu. Tapi senang bisa ngobrol denganmu!";
  }

  appendMessage("bot", response);
}
