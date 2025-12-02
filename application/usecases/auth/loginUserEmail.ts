import { LoginRequest } from "@/application/dtos/auth/loginRequest";
import { UserResponse } from "@/domain/entities/User";
import { IAuthRepository } from "@/domain/repositories/IAuthRepository";

export class LoginUserEmailUsecase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(payload: LoginRequest): Promise<UserResponse> {
    return await this.authRepository.loginEmail({
      email: payload.email,
      plainPassword: payload.plainPassword,
    });
  }
}
