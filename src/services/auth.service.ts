import bcrypt from "bcrypt";
import {
  createUser,
  findUserByEmail,
} from "../repositories/user.repository.js";
import type {
  AuthResponse,
  CreateUserData,
  LoginBody,
  RefreshAccessTokenResponse,
  RefreshTokenBody,
  SignupBody,
  User,
} from "../types/auth.types.js";
import { BadRequestError } from "../errors/bad-request.error.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/auth.utils.js";
import {
  createRefreshToken,
  findActiveRefreshTokens,
  revokeRefreshToken,
} from "../repositories/refresh-token.repository.js";

const createTokenPair = async (
  userId: number,
): Promise<{
  accessToken: string;
  refreshToken: string;
}> => {
  const accessToken = generateAccessToken({ userId });

  const refreshToken = generateRefreshToken();
  const saltRounds = Number(process.env.SALT) || 10;
  const refreshTokenHash = await bcrypt.hash(refreshToken, saltRounds);

  const refreshTokenExpiresAt = new Date();
  refreshTokenExpiresAt.setDate(refreshTokenExpiresAt.getDate() + 7);

  await createRefreshToken({
    userId,
    tokenHash: refreshTokenHash,
    expiresAt: refreshTokenExpiresAt,
  });

  return {
    accessToken,
    refreshToken,
  };
};

const buildAuthResponse = async (user: User): Promise<AuthResponse> => {
  const { accessToken, refreshToken } = await createTokenPair(user.id);

  const authResponse = {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    },
    accessToken,
    refreshToken,
  };

  return authResponse;
};

const findMatchingActiveRefreshToken = async (refreshToken: string) => {
  const activeRefreshTokens = await findActiveRefreshTokens();

  for (const tokenRecord of activeRefreshTokens) {
    const isRefreshTokenValid = await bcrypt.compare(
      refreshToken,
      tokenRecord.token_hash,
    );

    if (isRefreshTokenValid) {
      return tokenRecord;
    }
  }

  throw new BadRequestError("Invalid refresh token");
};

export const signup = async (data: SignupBody): Promise<AuthResponse> => {
  const { name, email, password } = data;
  const isUserExists = await findUserByEmail(email);
  const saltRounds = Number(process.env.SALT) || 10;

  if (isUserExists) {
    throw new BadRequestError("Email already exists");
  }

  const password_hash = await bcrypt.hash(password, saltRounds);

  const signupData: CreateUserData = {
    name,
    email,
    password_hash,
  };

  const user = await createUser(signupData);

  return await buildAuthResponse(user);
};

export const login = async (data: LoginBody): Promise<AuthResponse> => {
  const user = await findUserByEmail(data.email);

  if (!user) {
    throw new BadRequestError("Invalid credentials");
  }

  if (!user.password_hash) {
    throw new BadRequestError("Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(
    data.password,
    user.password_hash,
  );

  if (!isPasswordValid) {
    throw new BadRequestError("Invalid credentials");
  }

  return await buildAuthResponse(user);
};

export const refreshAccessToken = async (
  data: RefreshTokenBody,
): Promise<RefreshAccessTokenResponse> => {
  const tokenRecord = await findMatchingActiveRefreshToken(data.refreshToken);

  await revokeRefreshToken(tokenRecord.id);

  const { accessToken, refreshToken } = await createTokenPair(
    tokenRecord.user_id,
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const logout = async (data: RefreshTokenBody): Promise<void> => {
  const tokenRecord = await findMatchingActiveRefreshToken(data.refreshToken);

  await revokeRefreshToken(tokenRecord.id);
};
