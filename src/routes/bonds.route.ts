import { Router, type Express } from "express";

import type { BondsController } from "../controllers/index.ts";
import { validateMiddleware } from "../middlewares/index.ts";
import { bondValidationSchema } from "../validations/index.ts";

function bondsRouter(app: Express, controller: BondsController) {
  const router = Router();

  router.get("/all", controller.getAllUserBonds);
  router.get("/:id", controller.getBond);
  router.post(
    "/create",
    validateMiddleware(bondValidationSchema),
    controller.createBond
  );
  router.patch("/edit/:id", controller.editBond);
  router.delete("/delete/:id", controller.deleteBond);

  app.use("/bonds", router);
}

export default bondsRouter;
