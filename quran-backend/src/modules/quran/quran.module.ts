import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QuranController } from "./quran.controller";
import { QuranService } from "./quran.service";
import { QuranSurah } from "./entities/quran-surah.entity";
import { QuranAyah } from "./entities/quran-ayah.entity";
import { QuranAyatEdition } from "./entities/quran-ayat-edition.entity";
import { QuranAddon } from "./entities/quran-addon.entity";

@Module({
  imports: [TypeOrmModule.forFeature([QuranSurah, QuranAyah, QuranAyatEdition, QuranAddon])],
  controllers: [QuranController],
  providers: [QuranService],
})
export class QuranModule {}
