import { Controller, Get, Query } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { AyahService } from "./ayah.service";

@ApiTags('Editions')
@Controller("editions")
export class AyahController {
  constructor(private readonly ayahService: AyahService) {}

  @Get()
  @ApiOperation({ summary: 'Get all text editions/translations' })
  @ApiQuery({ name: 'type', required: false, enum: ['translation', 'tafsir'], description: 'Filter by edition type' })
  getEditions(@Query('type') type?: string) {
    return this.ayahService.getEditions(type);
  }
}
