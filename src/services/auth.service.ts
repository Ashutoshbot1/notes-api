import bcrypt from "bcrypt";
import {
  createUser,
  findUserByEmail,
} from "../repositories/user.repository.js";
import type {
  AuthUserResponse,
  CreateUserData,
  LoginBody,
  SignupBody,
} from "../types/auth.types.js";
import { BadRequestError } from "../errors/bad-request.error.js";

export const signup = async (data: SignupBody): Promise<AuthUserResponse> => {
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

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };
};

export const login = async (data: LoginBody): Promise<AuthUserResponse> => {
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

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };
};
