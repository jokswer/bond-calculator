import express from "express";

import appRoutes from "./routes/index.ts";
import { connectToDatabase } from "./services/index.ts";
import {
  BondsRepository,
  TokensRepository,
  UsersRepository,
} from "./repositories/index.ts";
import { BondsController, UsersController } from "./controllers/index.ts";
import { errorMiddleware } from "./middlewares/index.ts";

async function startServer() {
  await connectToDatabase(process.env.MONGODB_URI);

  const tokensRepository = new TokensRepository();
  const usersRepository = new UsersRepository(tokensRepository);
  const bondsRepository = new BondsRepository(tokensRepository);

  const usersController = new UsersController(usersRepository);
  const bondsController = new BondsController(bondsRepository);

  const app = express();

  app.use(express.json());
  appRoutes(app, usersController, bondsController);
  app.use(errorMiddleware);

  app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
  });
}

startServer();
