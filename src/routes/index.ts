import { type Express } from "express";

import {
  type UsersController,
  type BondsController,
} from "../controllers/index.ts";

import usersRouter from "./users.route.ts";
import bondsRouter from "./bonds.route.ts";

function appRoutes(
  app: Express,
  usersController: UsersController,
  bondsController: BondsController
) {
  usersRouter(app, usersController);
  bondsRouter(app, bondsController);
}

export default appRoutes;
