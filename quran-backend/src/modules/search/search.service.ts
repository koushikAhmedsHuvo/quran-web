import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AyahEdition } from "../ayah/entities/ayah-edition.entity";
import { paginate } from "../../common/dto/pagination.dto";

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(AyahEdition)
    private readonly ayahEditionRepository: Repository<AyahEdition>,
  ) {}

  async searchByTranslation(
    query: string,
    page: number,
    limit: number,
    editionId?: number,
  ) {
    const skip = (page - 1) * limit;

    const qb = this.ayahEditionRepository
      .createQueryBuilder("ae")
      .leftJoinAndMapOne("ae.ayah", "ayahs", "a", "a.id = ae.ayah_id")
      .select([
        "ae.id",
        "ae.ayah_id",
        "ae.edition_id",
        "ae.data",
        "a.id",
        "a.number",
        "a.text",
        "a.number_in_surah",
        "a.surah_id",
        "a.juz_id",
        "a.page",
        "a.sajda",
      ])
      .where("ae.data LIKE :q", { q: `%${query}%` })
      .andWhere("ae.is_audio = 0")
      .orderBy("a.number", "ASC");

    if (editionId) {
      qb.andWhere("ae.edition_id = :editionId", { editionId });
    }

    const total = await qb.getCount();
    const raw = await qb.offset(skip).limit(limit).getRawMany();

    const data = raw.map((r) => ({
      id: r["ae_id"],
      ayahId: r["ae_ayah_id"],
      editionId: r["ae_edition_id"],
      translation: r["ae_data"],
      ayah: {
        id: r["a_id"],
        number: r["a_number"],
        text: r["a_text"],
        numberInSurah: r["a_number_in_surah"],
        surahId: r["a_surah_id"],
        juzId: r["a_juz_id"],
        page: r["a_page"],
        sajda: r["a_sajda"],
      },
    }));

    return paginate(data, total, page, limit);
  }
}
