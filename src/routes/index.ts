import { type Express } from "express";

import usersRouter from "./users.ts";
import { type UsersController } from "../controllers/index.ts";

function appRoutes(app: Express, usersController: UsersController) {
  usersRouter(app, usersController);
}

export default appRoutes;
