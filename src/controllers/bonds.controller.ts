import type { NextFunction, Request, Response } from "express";

import type BondsRepository from "../repositories/bonds.repository.ts";

class BondsController {
  private readonly repository: BondsRepository;

  constructor(repository: BondsRepository) {
    this.repository = repository;
  }

  public createBond = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json("");
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

  public getAllBonds = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json("");
    } catch (error) {
      next(error);
    }
  };
}

export default BondsController;
