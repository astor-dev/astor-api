import { Module } from '@nestjs/common';
import { SeriesService } from 'src/applications/series/series.service';
import { CreateSeriesUseCase } from 'src/applications/series/useCases/CreateSeriesUseCase/CreateSeriesUseCase';

@Module({
  imports: [],
  providers: [SeriesService, CreateSeriesUseCase],
  controllers: [],
  exports: [SeriesService],
})
export class SeriesModule {}
