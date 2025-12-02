import { IAuthRepository } from "@/domain/repositories/IAuthRepository";
export class RefreshAccessTokenUsecase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(refreshToken: string): Promise<string> {
    return await this.authRepository.refreshAccessToken(refreshToken);
  }
}
