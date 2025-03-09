import { CreateSeriesUseCase } from 'src/applications/series/useCases/CreateSeriesUseCase/CreateSeriesUseCase';
import { Series, SeriesData } from 'src/applications/series/domain/series';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SeriesService {
  constructor(private readonly createSeriesUseCase: CreateSeriesUseCase) {}

  async createSeries(request: SeriesData[]): Promise<Series[]> {
    const series = await this.createSeriesUseCase.execute(request);
    return series;
  }
}
