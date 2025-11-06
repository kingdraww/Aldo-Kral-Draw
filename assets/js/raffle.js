// raffle.js — çekiliş mantığı (kazanan belirleme)

const Raffle = {
  /**
   * Verilen çekiliş ID'sine göre kazananları seçer.
   * @param {string} drawId - Çekiliş kimliği
   * @param {number} winnerCount - Kaç kişi kazanacak
   * @returns {Array} winners - Seçilen kazananlar listesi
   */
  selectWinners(drawId, winnerCount = 1) {
    // Katılımcıları storage'dan al
    let participants = Storage.get(drawId);

    if (!participants || participants.length === 0) {
      console.warn("Katılımcı bulunamadı.");
      return [];
    }

    // Kazanan sayısı sınır kontrolü
    if (winnerCount > participants.length) {
      winnerCount = participants.length;
    }

    // Katılımcıları karıştır (shuffle)
    const shuffled = participants.sort(() => Math.random() - 0.5);

    // İlk N kişiyi kazanan olarak al
    const winners = shuffled.slice(0, winnerCount);

    // Kazananları storage'a kaydet
    Storage.set("winners", winners);
    Storage.set(drawId + "_closed", true);

    console.log(`${winners.length} kazanan seçildi.`);
    return winners;
  },

  /**
   * Kazanan listesini döndürür.
   */
  getWinners() {
    return Storage.get("winners") || [];
  },

  /**
   * Kazananları temizler.
   */
  clearWinners() {
    localStorage.removeItem("winners");
  }
};
