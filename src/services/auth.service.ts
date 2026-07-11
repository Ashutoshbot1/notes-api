import bcrypt from "bcrypt";
import {
  createUser,
  findUserByEmail,
} from "../repositories/user.repository.js";
import type {
  AuthResponse,
  CreateUserData,
  LoginBody,
  SignupBody,
} from "../types/auth.types.js";
import { BadRequestError } from "../errors/bad-request.error.js";
import { generateAccessToken } from "../utils/auth.utils.js";

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

  const tokenPayload = {
    userId: user.id,
    email: user.email,
  };
  const accessToken = generateAccessToken(tokenPayload);

  const authResponse = {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    },
    accessToken,
  };

  return authResponse;
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

  const tokenPayload = {
    userId: user.id,
    email: user.email,
  };

  const accessToken = generateAccessToken(tokenPayload);

  const authResponse = {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    },
    accessToken,
  };

  return authResponse;
};
