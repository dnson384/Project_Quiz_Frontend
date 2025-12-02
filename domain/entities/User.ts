export interface User {
  readonly id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl: string;
}

export interface UserResponse {
  user: User;
  accessToken: string | null;
  refreshToken: string | null;
}
