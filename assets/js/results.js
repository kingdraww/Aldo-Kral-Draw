// results.js
// Güvenli Çekiliş Uygulaması - Sonuç Sayfası

import { loadData } from './storage.js';

const winnersList = document.getElementById('winnersList');
const lastUpdated = document.getElementById('lastUpdated');
const refreshBtn = document.getElementById('refreshResults');

// Sonuçları yükle
function loadResults() {
  const winners = loadData('winners');
  winnersList.innerHTML = '';

  if (!winners || winners.length === 0) {
    winnersList.innerHTML = '<li>Henüz kazanan açıklanmadı.</li>';
    lastUpdated.textContent = 'Bekleniyor...';
    return;
  }

  winners.forEach((winner, i) => {
    const li = document.createElement('li');
    li.textContent = `${i + 1}. ${winner}`;
    winnersList.appendChild(li);
  });

  lastUpdated.textContent = new Date().toLocaleString();
}

// Manuel yenileme
refreshBtn.addEventListener('click', loadResults);

// Otomatik kontrol (her 10 saniyede bir)
setInterval(loadResults, 10000);

// Sayfa yüklendiğinde başlat
window.addEventListener('DOMContentLoaded', loadResults);
