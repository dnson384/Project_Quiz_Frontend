import { User } from "../entities/User";

export interface IAdminRepository {
  getAllUsers: (accessToken: string) => Promise<User[]>;
  grantAdmin(accessToken: string, id: string): Promise<boolean>;
}
