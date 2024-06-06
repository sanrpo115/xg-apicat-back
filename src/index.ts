import { envs } from "./config";
import { MongoDatabase } from "./data/mongodb";
import { AppRoutes } from "./presentation/routes/routes";
import { Server } from "./presentation/server";

(() => {
  main()
})();

async function main() {

  process.loadEnvFile();
  
  await MongoDatabase.connect({
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL,
  })

  new Server({ port: 3100, routes: AppRoutes.routes }).start();
}