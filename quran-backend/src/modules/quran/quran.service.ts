import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { QuranSurah } from "./entities/quran-surah.entity";
import { SurahDto } from "./dto/surah.dto";

@Injectable()
export class QuranService {
  constructor(
    @InjectRepository(QuranSurah)
    private readonly surahRepository: Repository<QuranSurah>,
  ) {}

  async getAllSurahs(): Promise<SurahDto[]> {
    const surahs = await this.surahRepository.find();
    return surahs.map((surah) => ({
      id: surah.id,
      name: surah.nameEn, // Use nameEn for English transliteration
    }));
  }
}
