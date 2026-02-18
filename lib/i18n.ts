export type Language = 'en' | 'tr';

export interface Translations {
  appTitle: string;
  countdown: {
    sahurEnds: string;
    iftarIn: string;
    sahurEndsAt: string;
    iftarAt: string;
  };
  prayerNames: {
    fajr: string;
    sunrise: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
  };
  prayerLabels: {
    sahurEnds: string;
    sunriseOnly: string;
    noonPrayer: string;
    afternoonPrayer: string;
    iftarTime: string;
    nightPrayer: string;
  };
  dailyPrayerTimes: string;
  changeLocation: string;
  loading: {
    location: string;
    prayerTimes: string;
  };
  errors: {
    locationDenied: string;
    locationUnavailable: string;
    locationTimeout: string;
    locationUnsupported: string;
    fetchPrayerTimes: string;
    retry: string;
    setLocationManually: string;
  };
  manualLocation: {
    title: string;
    city: string;
    coordinates: string;
    cityPlaceholder: string;
    countryPlaceholder: string;
    latPlaceholder: string;
    lngPlaceholder: string;
    latLabel: string;
    lngLabel: string;
    countryOptional: string;
    cancel: string;
    setLocation: string;
    searching: string;
    cityRequired: string;
    invalidCoordinates: string;
    locationNotFound: string;
    errorOccurred: string;
  };
  verseOfDay: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    appTitle: 'Rayyan',
    countdown: {
      sahurEnds: 'Sahur Ends In',
      iftarIn: 'Iftar In',
      sahurEndsAt: 'Sahur ends at',
      iftarAt: 'Iftar at',
    },
    prayerNames: {
      fajr: 'Fajr',
      sunrise: 'Sunrise',
      dhuhr: 'Dhuhr',
      asr: 'Asr',
      maghrib: 'Maghrib',
      isha: 'Isha',
    },
    prayerLabels: {
      sahurEnds: 'Fasting Starts / Sahur Ends',
      sunriseOnly: 'Sunrise',
      noonPrayer: 'Noon prayer',
      afternoonPrayer: 'Afternoon prayer',
      iftarTime: 'Iftar Time',
      nightPrayer: 'Night prayer',
    },
    dailyPrayerTimes: 'Daily Prayer Times',
    changeLocation: 'Change Location',
    loading: {
      location: 'Getting your location...',
      prayerTimes: 'Fetching prayer times...',
    },
    errors: {
      locationDenied: 'Location access denied. Please enable location permissions or enter manually.',
      locationUnavailable: 'Location information unavailable. Please enter manually.',
      locationTimeout: 'Location request timed out. Please try again or enter manually.',
      locationUnsupported: 'Geolocation is not supported by your browser',
      fetchPrayerTimes: 'Failed to fetch prayer times. Please try again.',
      retry: 'Retry',
      setLocationManually: 'Set Location Manually',
    },
    manualLocation: {
      title: 'Set Location',
      city: 'City',
      coordinates: 'Coordinates',
      cityPlaceholder: 'e.g., Istanbul',
      countryPlaceholder: 'e.g., Turkey',
      latPlaceholder: 'e.g., 41.0082',
      lngPlaceholder: 'e.g., 28.9784',
      latLabel: 'Latitude (-90 to 90)',
      lngLabel: 'Longitude (-180 to 180)',
      countryOptional: 'Country (optional)',
      cancel: 'Cancel',
      setLocation: 'Set Location',
      searching: 'Searching...',
      cityRequired: 'Please enter a city name',
      invalidCoordinates: 'Please enter valid coordinates (Lat: -90 to 90, Lng: -180 to 180)',
      locationNotFound: 'Could not find location. Please try different spelling or use coordinates.',
      errorOccurred: 'An error occurred. Please try again.',
    },
    verseOfDay: 'Verse of the Day',
  },
  tr: {
    appTitle: 'Rayyan',
    countdown: {
      sahurEnds: 'İmsak Vaktine',
      iftarIn: 'İftara',
      sahurEndsAt: 'İmsak vakti',
      iftarAt: 'İftar saati',
    },
    prayerNames: {
      fajr: 'İmsak',
      sunrise: 'Güneş',
      dhuhr: 'Öğle',
      asr: 'İkindi',
      maghrib: 'Akşam',
      isha: 'Yatsı',
    },
    prayerLabels: {
      sahurEnds: 'Oruç Başlangıcı / Sahur Bitiş',
      sunriseOnly: 'Güneş',
      noonPrayer: 'Öğle namazı',
      afternoonPrayer: 'İkindi namazı',
      iftarTime: 'İftar Vakti',
      nightPrayer: 'Yatsı namazı',
    },
    dailyPrayerTimes: 'Günlük Namaz Vakitleri',
    changeLocation: 'Konum Değiştir',
    loading: {
      location: 'Konumunuz alınıyor...',
      prayerTimes: 'Namaz vakitleri yükleniyor...',
    },
    errors: {
      locationDenied: 'Konum izni reddedildi. Lütfen konum izinlerini etkinleştirin veya manuel girin.',
      locationUnavailable: 'Konum bilgisi mevcut değil. Lütfen manuel girin.',
      locationTimeout: 'Konum isteği zaman aşımına uğradı. Lütfen tekrar deneyin veya manuel girin.',
      locationUnsupported: 'Tarayıcınız konum özelliğini desteklemiyor',
      fetchPrayerTimes: 'Namaz vakitleri alınamadı. Lütfen tekrar deneyin.',
      retry: 'Tekrar Dene',
      setLocationManually: 'Konumu Manuel Gir',
    },
    manualLocation: {
      title: 'Konum Ayarla',
      city: 'Şehir',
      coordinates: 'Koordinatlar',
      cityPlaceholder: 'örn. İstanbul',
      countryPlaceholder: 'örn. Türkiye',
      latPlaceholder: 'örn. 41.0082',
      lngPlaceholder: 'örn. 28.9784',
      latLabel: 'Enlem (-90 ile 90)',
      lngLabel: 'Boylam (-180 ile 180)',
      countryOptional: 'Ülke (isteğe bağlı)',
      cancel: 'İptal',
      setLocation: 'Konum Ayarla',
      searching: 'Aranıyor...',
      cityRequired: 'Lütfen şehir adı girin',
      invalidCoordinates: 'Lütfen geçerli koordinatlar girin (Enlem: -90 ile 90, Boylam: -180 ile 180)',
      locationNotFound: 'Konum bulunamadı. Lütfen farklı bir yazım deneyin veya koordinatları kullanın.',
      errorOccurred: 'Bir hata oluştu. Lütfen tekrar deneyin.',
    },
    verseOfDay: 'Günün Ayeti',
  },
};

export function detectLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  
  const browserLang = navigator.language.toLowerCase();
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
  // Default to Turkish if timezone is Turkey
  if (timezone === 'Europe/Istanbul' || timezone === 'Asia/Istanbul') {
    return 'tr';
  }
  
  // Check browser language
  if (browserLang.startsWith('tr')) {
    return 'tr';
  }
  
  return 'en';
}
