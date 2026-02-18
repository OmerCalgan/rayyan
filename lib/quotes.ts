export type Language = 'en' | 'tr';

export interface Quote {
  text: string;
  source: string;
  language: Language;
}

export const quotes: Quote[] = [
  // English Quotes
  {
    text: "O you who have believed, decreed upon you is fasting as it was decreed upon those before you that you may become righteous.",
    source: "Quran 2:183",
    language: "en"
  },
  {
    text: "The Messenger of Allah said: 'Whoever fasts Ramadan out of faith and hope for reward, his past sins will be forgiven.'",
    source: "Bukhari & Muslim",
    language: "en"
  },
  {
    text: "Indeed, Allah is with those who fear Him and those who are doers of good.",
    source: "Quran 16:128",
    language: "en"
  },
  {
    text: "The Prophet said: 'There are two occasions of joy for one who fasts: one when he breaks the fast and the other when he will meet his Lord.'",
    source: "Bukhari & Muslim",
    language: "en"
  },
  {
    text: "And seek help through patience and prayer, and indeed, it is difficult except for the humbly submissive.",
    source: "Quran 2:45",
    language: "en"
  },
  {
    text: "The Messenger of Allah said: 'When the month of Ramadan starts, the gates of the heaven are opened and the gates of Hell are closed and the devils are chained.'",
    source: "Bukhari & Muslim",
    language: "en"
  },
  {
    text: "Indeed, with hardship comes ease.",
    source: "Quran 94:6",
    language: "en"
  },
  {
    text: "Give glad tidings to those who patiently persevere.",
    source: "Quran 2:155",
    language: "en"
  },
  {
    text: "The Prophet said: 'He who gives food for a fasting person to break his fast, he will receive the same reward as him, except that nothing will be reduced from the fasting persons reward.'",
    source: "Tirmidhi",
    language: "en"
  },
  {
    text: "And Allah is the best of providers.",
    source: "Quran 62:11",
    language: "en"
  },
  // Turkish Quotes
  {
    text: "Ey iman edenler! Oruç, sizden öncekiler üzerine yazıldığı gibi, sizin üzerinize de yazıldı. Umulur ki korunursunuz.",
    source: "Bakara Suresi 183",
    language: "tr"
  },
  {
    text: "Resulullah sallallahu aleyhi ve sellem şöyle buyurdu: 'Kim iman ederek ve sevabını Allah'tan umarak Ramazan orucunu tutarsa, geçmiş günahları bağışlanır.'",
    source: "Buhari ve Müslim",
    language: "tr"
  },
  {
    text: "Şüphesiz Allah, kendisine karşı gelmekten sakınanlarla ve iyilik yapanlarla beraberdir.",
    source: "Nahl Suresi 128",
    language: "tr"
  },
  {
    text: "Peygamber Efendimiz şöyle buyurdu: 'Oruç tutan kimse için iki sevinç vardır: Biri iftar ettiği zaman, diğeri Rabbine kavuştuğu zaman.'",
    source: "Buhari ve Müslim",
    language: "tr"
  },
  {
    text: "Sabır ve namazla yardım dileyin. Şüphesiz namaz, Allah'a saygı gösterenlere ağır gelir.",
    source: "Bakara Suresi 45",
    language: "tr"
  },
  {
    text: "Resulullah şöyle buyurdu: 'Ramazan ayı geldiğinde, cennet kapıları açılır, cehennem kapıları kapanır ve şeytanlar zincire vurulur.'",
    source: "Buhari ve Müslim",
    language: "tr"
  },
  {
    text: "Şüphesiz zorlukla beraber bir kolaylık vardır.",
    source: "İnşirah Suresi 6",
    language: "tr"
  },
  {
    text: "Sabredenleri müjdele!",
    source: "Bakara Suresi 155",
    language: "tr"
  },
  {
    text: "Peygamber Efendimiz şöyle buyurdu: 'Kim bir oruçluyu iftar ettirirse, oruçlunun sevabının aynısı ona da verilir, oruçlunun sevabından hiçbir şey eksiltilmez.'",
    source: "Tirmizi",
    language: "tr"
  },
  {
    text: "Allah, rızık verenlerin en hayırlısıdır.",
    source: "Cuma Suresi 11",
    language: "tr"
  }
];

export function getRandomQuote(language: Language): Quote {
  const languageQuotes = quotes.filter(q => q.language === language);
  const randomIndex = Math.floor(Math.random() * languageQuotes.length);
  return languageQuotes[randomIndex];
}
