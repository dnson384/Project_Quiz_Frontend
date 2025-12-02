import { User } from "@/domain/entities/User";
import { IUserRepository } from "@/domain/repositories/IUserRepository";

export class GetMeUsecase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(accessToken: string): Promise<User> {
    return this.userRepository.getMe(accessToken);
  }
}
