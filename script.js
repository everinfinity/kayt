document.addEventListener('DOMContentLoaded', function() {
    const kullaniciAdiInput = document.getElementById('kullaniciAdi'); // Kullanıcı adı alanı
    const hataMesajiDiv = document.getElementById('hataMesaji'); // Hata mesajının gösterileceği div
  
    kullaniciAdiInput.addEventListener('input', async function() {
      const kullaniciAdi = kullaniciAdiInput.value;
  
      // Sunucuya AJAX isteği gönder
      const response = await fetch(`/kontrol?kullaniciAdi=${kullaniciAdi}`);
      const data = await response.json();
  
      if (data.hata) {
        // Eğer hata varsa, hata mesajını göster
        hataMesajiDiv.innerText = data.hata;
      } else {
        // Eğer hata yoksa, hata mesajını temizle
        hataMesajiDiv.innerText = '';
      }
    });
  });





/*
document.addEventListener('DOMContentLoaded', (event) => {
    const kullaniciAdiInput = document.getElementById('kullaniciAdis');
    const kullaniciAdiHata = document.querySelector('kullaniciAdiHata');
    
    kullaniciAdiInput.addEventListener('blur', async () => {
        const kullaniciAdi = kullaniciAdiInput.value;
        // Ajax veya fetch kullanarak kullanıcı adını kontrol edin
        const response = await fetch(`/kontrol-kullanici-adi?kullaniciAdi=${kullaniciAdi}`);
        const veri = await response.json();
    
        if (veri.hata) {
            kullaniciAdiHata.textContent = 'Bu kullanıcı adı daha önce alınmış.';
            kullaniciAdiHata.style.display = 'block';
        } else {
            kullaniciAdiHata.textContent = '';
            kullaniciAdiHata.style.display = 'none';
        }
    });
    
    // Kullanıcı adı alanından veri silindiğinde hata mesajını gizle
    kullaniciAdiInput.addEventListener('input', () => {
        kullaniciAdiHata.textContent = '';
        kullaniciAdiHata.style.display = 'none';
    });
  });
*/
