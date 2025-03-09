import { ApiProperty } from '@nestjs/swagger';
import { SeriesData } from 'src/applications/series/domain/series';
import { ControllerResponse } from 'src/shared/core/presentations/Controller.response';

export class CreateSeriesRequest {
  @ApiProperty({ type: [SeriesData] })
  series: SeriesData[];
}

export class CreateSeriesResponse extends ControllerResponse {}
