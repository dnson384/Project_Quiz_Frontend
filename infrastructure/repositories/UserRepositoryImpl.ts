import { User } from "@/domain/entities/User";
import { IUserRepository } from "@/domain/repositories/IUserRepository";
import axios from "axios";

interface RawUserResponse {
  user_id: string;
  username: string;
  email: string;
  role: "STUDENT" | "TEACHER" | "ADMIN";
  avatar_url: string;
}

export class UserRepositoryImpl implements IUserRepository {
  constructor(
    private readonly baseUrl: string = process.env.BACKEND_URL || ""
  ) {}

  async getMe(accessToken: string): Promise<User> {
    const { data } = await axios.get<RawUserResponse>(
      `${this.baseUrl}/user/me`,
      {
        withCredentials: true,
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    return {
      id: data.user_id,
      name: data.username,
      email: data.email,
      role: data.role,
      avatarUrl: data.avatar_url,
    };
  }
}
