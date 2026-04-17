import { Module } from "@nestjs/common";
import { AyahController } from "./ayah.controller";
import { AyahService } from "./ayah.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Edition } from "./entities/edition.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Edition])],
  controllers: [AyahController],
  providers: [AyahService],
})
export class AyahModule {}
