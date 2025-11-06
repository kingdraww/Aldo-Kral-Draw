// storage.js — tüm veri işlemlerinin merkezi

const Storage = {
  /**
   * Belirtilen anahtar (key) için veriyi getirir.
   * JSON verisi varsa parse eder, yoksa null döner.
   */
  get(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (err) {
      console.error("Veri okunamadı:", err);
      return null;
    }
  },

  /**
   * Veriyi belirli bir anahtara kaydeder.
   * JS objesini JSON’a dönüştürür.
   */
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error("Veri kaydedilemedi:", err);
    }
  },

  /**
   * Anahtara ait veriyi siler.
   */
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.error("Veri silinemedi:", err);
    }
  },

  /**
   * Tüm localStorage verilerini temizler (uyarı: her şeyi siler!)
   */
  clearAll() {
    try {
      localStorage.clear();
      console.log("Tüm veriler temizlendi.");
    } catch (err) {
      console.error("Temizleme başarısız:", err);
    }
  },

  /**
   * Bir çekilişin katılımcı sayısını döndürür.
   */
  count(drawId) {
    const data = this.get(drawId);
    return data ? data.length : 0;
  },

  /**
   * Belirli bir çekilişin kapatılıp kapatılmadığını kontrol eder.
   */
  isClosed(drawId) {
    return this.get(drawId + "_closed") === true;
  }
};
