import { IUserRepository } from "@/domain/repositories/IUserRepository";

export class UploadAvatarUsecase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(formData: FormData): Promise<string> {
    return this.userRepository.uploadTempAvatar(formData);
  }
}
