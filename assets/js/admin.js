// admin.js
// Güvenli Çekiliş Uygulaması - Admin paneli

import { saveData, loadData } from './storage.js';
import { runRaffle } from './raffle.js';

const participantsInput = document.getElementById('participants');
const winnerCountInput = document.getElementById('winnerCount');
const startRaffleBtn = document.getElementById('startRaffle');
const winnersList = document.getElementById('winnersList');
const clearBtn = document.getElementById('clearData');

// Sayfa açıldığında eski verileri yükle
window.addEventListener('DOMContentLoaded', () => {
  const oldWinners = loadData('winners');
  if (oldWinners && oldWinners.length > 0) {
    renderWinners(oldWinners);
  }
});

// Çekilişi başlat
startRaffleBtn.addEventListener('click', () => {
  const participants = participantsInput.value
    .split('\n')
    .map(name => name.trim())
    .filter(name => name.length > 0);

  const winnerCount = parseInt(winnerCountInput.value, 10) || 1;

  if (participants.length === 0) {
    alert('Katılımcı listesi boş olamaz.');
    return;
  }

  if (winnerCount > participants.length) {
    alert('Kazanan sayısı katılımcılardan fazla olamaz.');
    return;
  }

  const winners = runRaffle(participants, winnerCount);
  saveData('winners', winners);
  renderWinners(winners);
  alert(`${winners.length} kazanan belirlendi!`);
});

// Eski verileri temizle
clearBtn.addEventListener('click', () => {
  if (confirm('Tüm verileri silmek istediğinizden emin misiniz?')) {
    localStorage.clear();
    winnersList.innerHTML = '';
    alert('Tüm veriler temizlendi.');
  }
});

// Kazananları ekrana bas
function renderWinners(winners) {
  winnersList.innerHTML = '';
  winners.forEach((winner, i) => {
    const li = document.createElement('li');
    li.textContent = `${i + 1}. ${winner}`;
    winnersList.appendChild(li);
  });
         }
