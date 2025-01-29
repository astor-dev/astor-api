export interface AstroFrontmatter {
  [key: string]: any;
}

export interface AstroContent {
  frontmatter: AstroFrontmatter;
  body: string;
}
