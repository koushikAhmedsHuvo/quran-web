import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";
import { SurahService } from "./surah.service";
import { PaginationDto } from "../../common/dto/pagination.dto";

@ApiTags("Surah")
@Controller("surah")
export class SurahController {
  constructor(private readonly surahService: SurahService) {}

  @Get()
  @ApiOperation({ summary: "Get all 114 surahs with Arabic & English names" })
  getAllSurahs() {
    return this.surahService.getAllSurahs();
  }

  @Get(":number")
  @ApiOperation({ summary: "Get a single surah by its number" })
  @ApiParam({ name: "number", type: Number })
  getSurahByNumber(@Param("number", ParseIntPipe) number: number) {
    return this.surahService.getSurahByNumber(number);
  }

  @Get(":number/ayahs")
  @ApiOperation({
    summary: "Get paginated ayahs of a surah with optional translation",
  })
  @ApiParam({ name: "number", type: Number })
  @ApiQuery({
    name: "editionId",
    required: false,
    type: Number,
    description: "Edition ID for translation",
  })
  getAyahsBySurah(
    @Param("number", ParseIntPipe) number: number,
    @Query() pagination: PaginationDto,
    @Query("editionId") editionId?: string,
  ) {
    return this.surahService.getAyahsBySurah(
      number,
      pagination.page ?? 1,
      pagination.limit ?? 10,
      editionId ? parseInt(editionId, 10) : undefined,
    );
  }
}
