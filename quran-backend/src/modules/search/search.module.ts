import { Module } from "@nestjs/common";
import { SearchController } from "./search.controller";
import { SearchService } from "./search.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AyahEdition } from "../ayah/entities/ayah-edition.entity";

@Module({
  imports: [TypeOrmModule.forFeature([AyahEdition])],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
