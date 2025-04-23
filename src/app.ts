import express from "express";

import appRoutes from "./routes/index.ts";
import { connectToDatabase } from "./services/index.ts";
import { TokensRepository, UsersRepository } from "./repositories/index.ts";
import { UsersController } from "./controllers/index.ts";

async function startServer() {
  await connectToDatabase(process.env.MONGODB_URI);

  const tokensRepository = new TokensRepository();
  const usersRepository = new UsersRepository(tokensRepository);
  
  const usersController = new UsersController(usersRepository);

  const app = express();

  app.use(express.json());

  appRoutes(app, usersController);

  app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
  });
}

startServer();
