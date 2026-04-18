export interface Ayah {
  id: number;
  number: number;
  text: string;
  numberInSurah: number;
  page: number;
  surahId: number;
  hizbId: number;
  juzId: number;
  sajda: boolean;
  translation?: string | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface SearchResult {
  id: number;
  ayahId: number;
  editionId: number;
  translation: string;
  ayah: Ayah;
}
