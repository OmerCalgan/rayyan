# Rayyan 🌙

<div align="center">

**Ramazan ve Namaz Takip Arkadaşınız**

</div>

## 🇹🇷 Türkçe

**Rayyan**, Ramazan ayı ve günlük ibadet hayatınızı kolaylaştırmak için geliştirilmiş, modern ve gizlilik odaklı bir uygulamadır. Karmaşık arayüzlerden uzak, sade ve işlevsel bir deneyim sunar.

### Özellikler

- **🕐 Hassas Vakitler:** Diyanet İşleri Başkanlığı hesaplama metodu (Metod 13) kullanılarak belirlenen, konum bazlı İmsak ve namaz vakitleri.
- **⏱️ Akıllı Sayac:** İftara (Akşam) ve Sahura (İmsak) kalan süreyi otomatik hesaplayan dinamik geri sayım.
- **📿 Kaza Takibi:** Kaza namazlarınızı cihazınızda yerel olarak (localStorage) saklayan, internet bağlantısı gerektirmeyen takip sistemi. Verileriniz sadece sizde kalır.
- **🎨 Tema Seçenekleri:** Kadir Gecesi, Medine Sabahı, Teheccüd Vakti ve Hicret Yolu temaları ile kişiselleştirilebilir arayüz.
- **🎵 Sufi Müzik:** Arka planda çalabilen, manevi atmosfer oluşturan ambient sesler.
- **📱 PWA Desteği:** Web tarayıcısından indirilebilir, tam ekran çalışan Progressive Web App desteği.

### Teknolojiler

- **Frontend:** Next.js 15, React, TypeScript
- **Styling:** Tailwind CSS (Özel CSS değişkenleri ile tema motoru)
- **Mobil:** Capacitor.js (Android native container)
- **Veri:** LocalStorage, React Context API
- **İkonlar:** Lucide React

### Kurulum

```bash
npm install
npm run build
npx cap sync android
```

### Android APK

Son sürümü `releases/` klasöründen indirebilirsiniz.

---

## 🇬🇧 English

**Rayyan** is a modern, privacy-focused companion for Ramadan and daily prayer tracking. Built with a minimalist philosophy, it cuts through the clutter of traditional apps to deliver exactly what you need.

### Features

- **🕐 Accurate Times:** Location-based prayer times calculated using the official Diyanet (Turkish Religious Affairs) method (Method 13).
- **⏱️ Smart Countdown:** Dynamic timer that automatically switches between counting down to Iftar (Maghrib) and Sahur (Fajr/Imsak).
- **📿 Missed Prayer Tracker:** Offline-first Qada prayer tracker using localStorage. Your data stays on your device, never sent to servers.
- **🎨 Divine Themes:** Choose from Kadir Night, Medina Morning, Tahajjud Time, or Hijra Path color themes.
- **🎵 Ambient Audio:** Optional background Sufi music to enhance your spiritual focus.
- **📱 PWA Ready:** Install as a Progressive Web App on iOS and Android for a native-like experience.

### Tech Stack

- **Core:** Next.js 15, React, TypeScript
- **Styling:** Tailwind CSS with custom CSS variable theme engine
- **Mobile:** Capacitor.js for native Android runtime
- **Storage:** LocalStorage with React Context API
- **Icons:** Lucide React

### Installation

```bash
npm install
npm run build
npx cap sync android
```

### Download

Get the latest Android APK from the `releases/` folder.

---

<div align="center">

*Developed with care for the community.*

</div>
