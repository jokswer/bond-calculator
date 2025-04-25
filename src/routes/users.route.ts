import { Router, type Express } from "express";

import type { UsersController } from "../controllers/index.ts";
import { validateMiddleware } from "../middlewares/validation.middleware.ts";
import { userValidationSchema } from "../validations/user.validation.ts";

function usersRouter(app: Express, controller: UsersController) {
  const router = Router();

  router.post(
    "/register",
    validateMiddleware(userValidationSchema),
    controller.registerUser
  );
  router.post(
    "/login",
    validateMiddleware(userValidationSchema),
    controller.loginUser
  );

  app.use("/users", router);
}

export default usersRouter;
