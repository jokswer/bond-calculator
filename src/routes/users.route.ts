import { Router, type Express } from "express";

import type { UsersController } from "../controllers/index.ts";

function usersRouter(app: Express, controller: UsersController) {
  const router = Router();

  router.post("/register", controller.registerUser);
  router.post("/login", controller.loginUser);

  app.use("/users", router);
}

export default usersRouter;
