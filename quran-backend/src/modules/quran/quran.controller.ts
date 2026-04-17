import { Controller, Get } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiOkResponse } from "@nestjs/swagger";
import { QuranService } from "./quran.service";
import { SurahDto } from "./dto/surah.dto";

@ApiTags("Quran")
@Controller("quran")
export class QuranController {
  constructor(private readonly quranService: QuranService) {}

  @Get("surahs")
  @ApiOperation({ summary: "Get all surahs" })
  @ApiOkResponse({ description: "List of all surahs", type: [SurahDto] })
  async getAllSurahs(): Promise<SurahDto[]> {
    // Map to DTO if needed, here just return all fields
    return this.quranService.getAllSurahs();
  }
}
