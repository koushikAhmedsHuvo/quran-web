export interface Surah {
  number: number;
  nameAr: string;
  nameEn: string;
  nameEnTranslation: string;
  type: string;
}

export interface Edition {
  id: number;
  identifier: string;
  language: string;
  name: string;
  englishName: string;
  format: string;
  type: string;
}
