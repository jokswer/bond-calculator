import { Router, type Express } from "express";

import type { BondsController } from "../controllers/index.ts";

function bondsRouter(app: Express, controller: BondsController) {
  const router = Router();

  router.get("/all", controller.getAllBonds);
  router.get("/:id", controller.getBond);
  router.post("/create", controller.createBond);
  router.patch("/edit/:id", controller.editBond);
  router.delete("/delete/:id", controller.deleteBond);

  app.use("/bonds", router);
}

export default bondsRouter;
