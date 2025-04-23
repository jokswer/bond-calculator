import type { Request, Response } from "express";

import { type UsersRepository } from "../repositories/index.ts";

class UsersController {
  private readonly repository: UsersRepository;

  constructor(repository: UsersRepository) {
    this.repository = repository;
  }

  public registerUser = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const userData = await this.repository.createUser(email, password);

      res.json(userData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };

  public loginUser = async (req, res) => {
    res.send("User logged in");
  };
}

export default UsersController;
