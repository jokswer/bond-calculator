import bcrypt from "bcryptjs";

import type TokensRepository from "./tokens.repository.ts";
import { userModel } from "../models/index.ts";
import { UserDto } from "../dtos/index.ts";
import { ApiError } from "../exceptions/index.ts";

class UsersRepository {
  private readonly tokensRepository: TokensRepository;

  constructor(tokensRepository: TokensRepository) {
    this.tokensRepository = tokensRepository;
  }

  public createUser = async (email: string, password: string) => {
    const user = await userModel.findOne({ email });

    if (user) {
      throw ApiError.BadRequest("User already exists");
    }

    const hashedPassword = await bcrypt.hash(
      password,
      Number.parseInt(process.env.HASH_SALT)
    );
    const newUser = await userModel.create({ email, password: hashedPassword });

    const userDto = new UserDto(newUser._id.toString(), newUser.email);
    const tokens = this.tokensRepository.generateTokens({ ...userDto });

    await this.tokensRepository.saveToken(userDto.id, tokens.refreshToken);
    await newUser.save();

    return { ...tokens, user: userDto };
  };

  public login = async (email: string, password: string) => {
    const user = await userModel.findOne({ email });

    if (!user) {
      throw ApiError.BadRequest("Email not found");
    }

    const isPasswordEqual = await bcrypt.compare(password, user.password);

    if (!isPasswordEqual) {
      throw ApiError.BadRequest("Incorrect password");
    }

    const userDto = new UserDto(user._id.toString(), user.email);
    const tokens = this.tokensRepository.generateTokens({ ...userDto });

    await this.tokensRepository.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  };
}

export default UsersRepository;
