// 계층 단순화를 위해 애플리케이션 계층 내부에 도메인 모델을 정의합니다.

import { ApiProperty } from '@nestjs/swagger';
import { AstroContent, AstroFrontmatter } from 'src/shared/types/AstroContent';

export enum ProjectType {
  ToyProject = 'Toy-project',
  SideProject = 'Side-project',
  CompanyProject = 'Company-project',
}

export enum ProjectRole {
  Frontend = 'Frontend',
  Backend = 'Backend',
  Infra = 'Infra',
  UIUX = 'UI/UX',
  Design = 'Design',
  Plan = 'Plan',
  Etc = 'Etc',
}

// 편의상 swagger 통합을 위해 클래스로 정의합니다.
export class ProjectFrontmatter implements AstroFrontmatter {
  @ApiProperty({
    enum: ProjectType,
  })
  projectType: ProjectType;

  @ApiProperty()
  imageUrl: string;

  @ApiProperty()
  siteUrl: string;

  @ApiProperty({
    enum: ProjectRole,
    isArray: true,
  })
  roles: ProjectRole[];

  @ApiProperty()
  companyName: string;

  @ApiProperty()
  projectName: string;

  @ApiProperty()
  shortDescription: string;

  @ApiProperty()
  startedAt: string;

  @ApiProperty()
  endedAt: string;

  @ApiProperty()
  stack: {
    id: number;
    type: string;
  }[];

  @ApiProperty()
  primaryColor: string | null;

  @ApiProperty()
  backgroundColor: string | null;
}

export class Project implements AstroContent {
  private readonly _frontmatter: ProjectFrontmatter;
  private readonly _body: string;

  constructor(frontmatter: ProjectFrontmatter, body: string) {
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
