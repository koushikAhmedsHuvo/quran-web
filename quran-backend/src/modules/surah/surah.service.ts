import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Surah } from './entities/surah.entity';
import { Ayah } from '../ayah/entities/ayah.entity';
import { AyahEdition } from '../ayah/entities/ayah-edition.entity';
import { paginate } from '../../common/dto/pagination.dto';

@Injectable()
export class SurahService {
  constructor(
    @InjectRepository(Surah)
    private readonly surahRepository: Repository<Surah>,
    @InjectRepository(Ayah)
    private readonly ayahRepository: Repository<Ayah>,
    @InjectRepository(AyahEdition)
    private readonly ayahEditionRepository: Repository<AyahEdition>,
  ) {}

  async getAllSurahs() {
    return this.surahRepository.find({ order: { number: 'ASC' } });
  }

  async getSurahByNumber(number: number) {
    const surah = await this.surahRepository.findOne({ where: { number } });
    if (!surah) throw new NotFoundException(`Surah ${number} not found`);
    return surah;
  }

  async getAyahsBySurah(
    surahNumber: number,
    page: number,
    limit: number,
    editionId?: number,
  ) {
    await this.getSurahByNumber(surahNumber);

    const skip = (page - 1) * limit;

    const [ayahs, total] = await this.ayahRepository.findAndCount({
      where: { surahId: surahNumber },
      order: { numberInSurah: 'ASC' },
      skip,
      take: limit,
    });

    if (!editionId) {
      return paginate(ayahs, total, page, limit);
    }

    const ayahIds = ayahs.map((a) => a.id);

    let translations: AyahEdition[] = [];
    if (ayahIds.length > 0) {
      translations = await this.ayahEditionRepository
        .createQueryBuilder('ae')
        .where('ae.ayah_id IN (:...ids)', { ids: ayahIds })
        .andWhere('ae.edition_id = :editionId', { editionId })
        .andWhere('ae.is_audio = 0')
        .getMany();
    }

    const translationMap = new Map(translations.map((t) => [t.ayahId, t.data]));

    const data = ayahs.map((ayah) => ({
      ...ayah,
      translation: translationMap.get(ayah.id) ?? null,
    }));

    return paginate(data, total, page, limit);
  }
}
