export interface AstroFrontmatter {
  [key: string]: any;
}

export interface AstroContent {
  frontmatter: AstroFrontmatter;
  body: string;
}

export interface AstroJson {
  [key: string]: any;
}

export interface AstroJsonContent {
  data: AstroJson;
}
