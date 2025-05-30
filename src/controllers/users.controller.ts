import type { NextFunction, Request, Response } from "express";

import { type UsersRepository } from "../repositories/index.ts";

class UsersController {
  private readonly repository: UsersRepository;

  constructor(repository: UsersRepository) {
    this.repository = repository;
  }

  public registerUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email, password } = req.body;

      const userData = await this.repository.createUser(email, password);

      res.json(userData);
    } catch (error) {
      next(error);
    }
  };

  public loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email, password } = req.body;

      const userData = await this.repository.login(email, password);

      res.json(userData);
    } catch (error) {
      next(error);
    }
  };

  public logoutUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { refreshToken } = req.body;

      await this.repository.logout(refreshToken);

      res.status(200).json("Done");
    } catch (error) {
      next(error);
    }
  };

  public refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.body;

      const userData = await this.repository.refresh(refreshToken);

      res.json(userData);
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
