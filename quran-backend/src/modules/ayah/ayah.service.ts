import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Edition } from "./entities/edition.entity";

@Injectable()
export class AyahService {
  constructor(
    @InjectRepository(Edition)
    private readonly editionRepository: Repository<Edition>,
  ) {}

  async getEditions(type?: string) {
    const qb = this.editionRepository
      .createQueryBuilder("e")
      .where("e.format = :format", { format: "text" })
      .orderBy("e.language", "ASC");

    if (type) {
      qb.andWhere("e.type = :type", { type });
    }

    return qb.getMany();
  }
}
