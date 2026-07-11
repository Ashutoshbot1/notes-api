import bcrypt from "bcrypt";
import {
  createUser,
  findUserByEmail,
} from "../repositories/user.repository.js";
import type { CreateUserData, SignupBody, User } from "../types/auth.types.js";
import { BadRequestError } from "../errors/bad-request.error.js";

export const signup = async (data: SignupBody): Promise<User> => {
  const { name, email, password } = data;
  const isUserExists = await findUserByEmail(email);
  const saltRounds = Number(process.env.SALT) || 10;

  if (isUserExists) {
    throw new BadRequestError("Email already Exists");
  }

  const password_hash = await bcrypt.hash(password, saltRounds);

  const signupData: CreateUserData = {
    name,
    email,
    password_hash,
  };

  const user = await createUser(signupData);

  return user;
};
