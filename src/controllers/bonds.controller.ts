import type { NextFunction, Request, Response } from "express";

import type BondsRepository from "../repositories/bonds.repository.ts";
import type TokensRepository from "../repositories/tokens.repository.ts";
import ApiError from "../exceptions/api.exception.ts";

class BondsController {
  private readonly bondsRepository: BondsRepository;
  private readonly tokensRepository: TokensRepository;

  constructor(
    bondsRepository: BondsRepository,
    tokensRepository: TokensRepository
  ) {
    this.bondsRepository = bondsRepository;
    this.tokensRepository = tokensRepository;
  }

  public createBond = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = this.getUserId(req);

      if (!userId) {
        throw ApiError.UnauthorizedError();
      }

      const bondData = req.body;

      const bond = await this.bondsRepository.createBond(userId, bondData);

      res.json(bond);
    } catch (error) {
      next(error);
    }
  };

  public editBond = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json("");
    } catch (error) {
      next(error);
    }
  };

  public deleteBond = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json("");
    } catch (error) {
      next(error);
    }
  };

  public getBond = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json("");
    } catch (error) {
      next(error);
    }
  };

  public getAllUserBonds = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = this.getUserId(req);

      if (!userId) {
        throw ApiError.UnauthorizedError();
      }

      const bonds = await this.bondsRepository.getAllUserBonds(userId);
      res.json(bonds);
    } catch (error) {
      next(error);
    }
  };

  private getUserId = (req: Request) => {
    const authorizationToken = req.headers.authorization;

    const accessToken = authorizationToken?.split(" ")?.[1];

    if (!accessToken) {
      return null;
    }

    const userData = this.tokensRepository.validateAccessToken(accessToken);

    if (!userData) {
      return null;
    }

    return userData.id;
  };
}

export default BondsController;
