import jwt from "jsonwebtoken";

import { tokenModel } from "../models/index.ts";
import { type UserDto } from "../dtos/index.ts";

class TokensRepository {
  public generateTokens = (payload: UserDto) => {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(payload, process.env.JVT_REFRESH_SECRET, {
      expiresIn: "30d",
    });

    return { accessToken, refreshToken };
  }

  public saveToken = async (userId: string, refreshToken: string) => {
    const tokenData = await tokenModel.findOne({ user: userId });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }

    const newToken = await tokenModel.create({ user: userId, refreshToken });
    return newToken;
  }
}

export default TokensRepository;
