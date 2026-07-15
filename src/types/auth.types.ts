export interface SignupBody {
  name: string;
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password_hash: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateUserData {
  name: string;
  email: string;
  password_hash: string;
}

export interface AuthUserResponse {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: AuthUserResponse;
  accessToken: string;
  refreshToken: string;
}

export interface AccessTokenPayload {
  userId: number;
  email: string;
}
