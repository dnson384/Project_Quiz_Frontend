import { User } from "../entities/User";

export interface IUserRepository {
  getMe: (accessToken: string) => Promise<User>;
}
