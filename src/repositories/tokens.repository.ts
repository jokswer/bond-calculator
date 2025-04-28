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
  };

  public validateAccessToken = (accessToken: string) => {
    try {
      const userData = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
      return userData as UserDto;
    } catch (error) {
      return null;
    }
  };

  public validateRefreshToken = (refreshToken: string) => {
    try {
      const userData = jwt.verify(refreshToken, process.env.JVT_REFRESH_SECRET);
      return userData as UserDto;
    } catch (error) {
      return null;
    }
  };

  public saveToken = async (userId: string, refreshToken: string) => {
    const tokenData = await tokenModel.findOne({ user: userId });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }

    const newToken = await tokenModel.create({ user: userId, refreshToken });
    return newToken;
  };

  public removeToken = async (refreshToken: string) => {
    const tokenData = await tokenModel.deleteOne({ refreshToken });
    return tokenData;
  };

  public findToken = async (refreshToken: string) => {
    const tokenData = await tokenModel.findOne({ refreshToken });
    return tokenData;
  };
}

export default TokensRepository;
