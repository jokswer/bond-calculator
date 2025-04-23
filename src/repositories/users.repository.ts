import bcrypt from "bcryptjs";

import type TokensRepository from "./tokens.repository.ts";
import { userModel } from "../models/index.ts";
import { UserDto } from "../dtos/index.ts";

class UsersRepository {
  private readonly tokensRepository: TokensRepository;

  constructor(tokensRepository: TokensRepository) {
    this.tokensRepository = tokensRepository;
  }

  public createUser = async (email: string, password: string) => {
    const user = await userModel.findOne({ email });

    if (user) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, Number.parseInt(process.env.HASH_SALT));
    const newUser = await userModel.create({ email, password: hashedPassword });

    const userDto = new UserDto(newUser._id.toString(), newUser.email);
    const tokens = this.tokensRepository.generateTokens({ ...userDto });
    await this.tokensRepository.saveToken(userDto.id, tokens.refreshToken);

    await newUser.save();

    return { ...tokens, user: userDto };
  }
}

export default UsersRepository;
