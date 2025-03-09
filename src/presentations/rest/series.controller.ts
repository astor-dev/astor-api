import { Body, Controller, HttpStatus, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GithubService } from 'src/applications/github/github.service';
import { SeriesService } from 'src/applications/series/series.service';
import {
  CreateSeriesRequest,
  CreateSeriesResponse,
} from 'src/presentations/rest/dto/series/createSeries';
import { createAstroJsonContent } from 'src/shared/utils/createAstroJsonContent';

@Controller('series')
export class SeriesController {
  constructor(
    private readonly seriesService: SeriesService,
    private readonly githubService: GithubService,
  ) {}

  @Put()
  @UseGuards(AuthGuard('jwt'))
  async createProject(
    @Body() request: CreateSeriesRequest,
  ): Promise<CreateSeriesResponse> {
    const series = await this.seriesService.createSeries(request.series);
    await this.githubService.createOrUpdateFile({
      path: `src/content/series/series.json`,
      content: createAstroJsonContent(series),
      message: `chore(content): add series json via API`,
    });
    return {
      ok: true,
      statusCode: HttpStatus.OK,
    };
  }
}
