import { ApiProperty } from '@nestjs/swagger';
import { AstroJson, AstroJsonContent } from 'src/shared/types/AstroContent';

// 편의상 swagger 통합을 위해 클래스로 정의합니다.
export class SeriesData implements AstroJson {
  @ApiProperty()
  id: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  ogImage: string;
}

export class Series implements AstroJsonContent {
  private readonly _data: SeriesData;

  constructor(data: SeriesData) {
    this._data = data;
  }

  get data() {
    return this._data;
  }
}
