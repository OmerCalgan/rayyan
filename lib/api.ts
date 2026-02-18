import axios from 'axios';

export interface PrayerTimes {
  imsak: string;
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

export interface PrayerTimesResponse {
  code: number;
  status: string;
  data: {
    timings: {
      Fajr: string;
      Sunrise: string;
      Dhuhr: string;
      Asr: string;
      Maghrib: string;
      Isha: string;
      Imsak: string;
      Midnight: string;
      Firstthird: string;
      Lastthird: string;
    };
    date: {
      readable: string;
      timestamp: string;
      gregorian: {
        date: string;
        format: string;
        day: string;
        weekday: {
          en: string;
        };
        month: {
          number: number;
          en: string;
        };
        year: string;
      };
      hijri: {
        date: string;
        format: string;
        day: string;
        weekday: {
          en: string;
          ar: string;
        };
        month: {
          number: number;
          en: string;
          ar: string;
        };
        year: string;
      };
    };
    meta: {
      latitude: number;
      longitude: number;
      timezone: string;
      method: {
        id: number;
        name: string;
        params: {
          Fajr: number;
          Isha: number;
        };
      };
    };
  };
}

export async function fetchPrayerTimes(
  lat: number,
  lng: number
): Promise<{ times: PrayerTimes; hijriDate: string; gregorianDate: string; timezone: string }> {
  const response = await axios.get<PrayerTimesResponse>(
    `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=13&tune=2,2,0,0,0,0,0,0,0`
  );

  const { data } = response.data;
  const { timings, date } = data;

  return {
    times: {
      imsak: timings.Imsak,
      fajr: timings.Fajr,
      sunrise: timings.Sunrise,
      dhuhr: timings.Dhuhr,
      asr: timings.Asr,
      maghrib: timings.Maghrib,
      isha: timings.Isha,
    },
    hijriDate: `${date.hijri.day} ${date.hijri.month.en} ${date.hijri.year} AH`,
    gregorianDate: date.readable,
    timezone: data.meta.timezone,
  };
}
