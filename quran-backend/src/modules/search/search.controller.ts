import { BadRequestException, Controller, Get, Query } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { SearchService } from "./search.service";
import { PaginationDto } from "../../common/dto/pagination.dto";

@ApiTags("Search")
@Controller("search")
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  @ApiOperation({ summary: "Search ayahs by translation text" })
  @ApiQuery({ name: "q", required: true, description: "Search query text" })
  @ApiQuery({
    name: "editionId",
    required: false,
    type: Number,
    description: "Filter by edition ID",
  })
  search(
    @Query("q") q: string,
    @Query() pagination: PaginationDto,
    @Query("editionId") editionId?: string,
  ) {
    if (!q || q.trim().length === 0) {
      throw new BadRequestException('Search query "q" is required');
    }
    return this.searchService.searchByTranslation(
      q.trim(),
      pagination.page ?? 1,
      pagination.limit ?? 10,
      editionId ? parseInt(editionId, 10) : undefined,
    );
  }
}
