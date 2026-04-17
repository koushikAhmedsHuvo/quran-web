import { Module } from "@nestjs/common";
import { SurahController } from "./surah.controller";
import { SurahService } from "./surah.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Surah } from "./entities/surah.entity";
import { Ayah } from "../ayah/entities/ayah.entity";
import { AyahEdition } from "../ayah/entities/ayah-edition.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Surah, Ayah, AyahEdition])],
  controllers: [SurahController],
  providers: [SurahService],
})
export class SurahModule {}
