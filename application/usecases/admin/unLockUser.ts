import { IAdminRepository } from "@/domain/repositories/IAdminRepository";

export class UnLockUserUsecase {
  constructor(private readonly adminRepository: IAdminRepository) {}

  async execute(accessToken: string, id: string): Promise<boolean> {
    return this.adminRepository.unLockUser(accessToken, id);
  }
}
