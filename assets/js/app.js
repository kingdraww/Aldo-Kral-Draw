// app.js — çekilişe katılım işlemleri

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("raffleForm");
  const message = document.getElementById("formMessage");

  // URL parametresinden çekiliş ID'si al
  const urlParams = new URLSearchParams(window.location.search);
  const drawId = urlParams.get("id") || "default_draw";

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const uid = document.getElementById("uid").value.trim();

    // Basit doğrulama
    if (!username || !email || !uid) {
      showMessage("⚠️ Lütfen tüm alanları doldurun.", "error");
      return;
    }

    // Katılımcı nesnesi
    const participant = { username, email, uid };

    // Mevcut verileri al
    let participants = Storage.get(drawId) || [];
    const alreadyExists = participants.some(p => p.uid === uid || p.email === email);

    if (alreadyExists) {
      showMessage("⚠️ Bu kullanıcı zaten katılmış.", "error");
      return;
    }

    // Kaydet
    participants.push(participant);
    Storage.set(drawId, participants);

    form.reset();
    showMessage("✅ Katılım başarılı! Bol şans 🍀", "success");
  });

  function showMessage(text, type) {
    message.textContent = text;
    message.className = type === "error" ? "error-msg" : "success-msg";
    setTimeout(() => (message.textContent = ""), 4000);
  }
});
