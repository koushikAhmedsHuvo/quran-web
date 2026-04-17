import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QuranModule } from "./modules/quran/quran.module";
import { SurahModule } from "./modules/surah/surah.module";
import { AyahModule } from "./modules/ayah/ayah.module";
import { SearchModule } from "./modules/search/search.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: false,
    }),
    QuranModule,
    SurahModule,
    AyahModule,
    SearchModule,
  ],
})
export class AppModule {}
