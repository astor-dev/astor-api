import { Injectable } from '@nestjs/common';
import { Series, SeriesData } from 'src/applications/series/domain/series';

import { UseCase } from 'src/shared/core/applications/UseCase';

@Injectable()
export class CreateSeriesUseCase implements UseCase<SeriesData[], Series[]> {
  constructor() {}

  async execute(request: SeriesData[]): Promise<Series[]> {
    return request.map((data) => new Series(data));
  }
}
