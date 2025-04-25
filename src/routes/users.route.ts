import { Router, type Express } from "express";

import type { UsersController } from "../controllers/index.ts";
import { validateMiddleware } from "../middlewares/validation.middleware.ts";
import {
  userTokenValidationSchema,
  userValidationSchema,
} from "../validations/user.validation.ts";

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
  router.delete(
    "/logout",
    validateMiddleware(userTokenValidationSchema),
    controller.logoutUser
  );
  router.post(
    "/refresh",
    validateMiddleware(userTokenValidationSchema),
    controller.refreshToken
  );

  app.use("/users", router);
}

export default usersRouter;
