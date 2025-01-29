import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class GithubService {
  private readonly token: string;
  private readonly owner: string;
  private readonly repo: string;
  private readonly branch: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.token = this.configService.get<string>('github.token');
    this.owner = this.configService.get<string>('github.owner');
    this.repo = this.configService.get<string>('github.repo');
    this.branch = this.configService.get<string>('github.branch');
  }

  async createOrUpdateFile({
    path,
    content,
    message,
  }: {
    path: string;
    content: string;
    message: string;
  }): Promise<void> {
    try {
      // 기존 파일 확인
      let sha: string | undefined;
      try {
        const { data } = await this.httpService.axiosRef.get(
          `https://api.github.com/repos/${this.owner}/${this.repo}/contents/${path}`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          },
        );

        if (!Array.isArray(data)) {
          sha = data.sha;
        }
      } catch (error) {
        // 파일이 없는 경우 무시
      }

      // 파일 생성 또는 업데이트
      await this.httpService.axiosRef.put(
        `https://api.github.com/repos/${this.owner}/${this.repo}/contents/${path}`,
        {
          message,
          content: Buffer.from(content).toString('base64'),
          branch: this.branch,
          ...(sha && { sha }),
        },
      );
    } catch (error) {
      throw new Error(`GitHub API 오류: ${error.message}`);
    }
  }
}
