// 계층 단순화를 위해 애플리케이션 계층 내부에 도메인 모델을 정의합니다.

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

export interface ProjectFrontmatter extends AstroFrontmatter {
  projectType: ProjectType;
  imageUrl: string;
  siteUrl: string;
  roles: ProjectRole[];
  companyName: string;
  projectName: string;
  shortDescription: string;
  startedAt: string;
  endedAt: string;
  stackIds: number[];
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
