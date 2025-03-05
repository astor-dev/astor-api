import { ApiProperty } from '@nestjs/swagger';
import { AstroContent, AstroFrontmatter } from 'src/shared/types/AstroContent';

// 편의상 swagger 통합을 위해 클래스로 정의합니다.
export class PostFrontmatter implements AstroFrontmatter {
  @ApiProperty()
  id: string;
  @ApiProperty()
  author: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  pinned: boolean;
  @ApiProperty()
  draft: boolean;
  @ApiProperty()
  tags: string[];
  @ApiProperty()
  ogImage: string;
  @ApiProperty()
  series: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  createdAt: string;
  @ApiProperty()
  updatedAt: string;
}

export class Post implements AstroContent {
  private readonly _frontmatter: PostFrontmatter;
  private readonly _body: string;

  constructor(frontmatter: PostFrontmatter, body: string) {
    this._body = body;
    this._frontmatter = frontmatter;
  }

  get frontmatter() {
    return this._frontmatter;
  }

  get body() {
    return this._body;
  }
}
