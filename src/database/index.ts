import wait from "../utils/wait";
import { AppDataSource } from "./config";

const initializeDatabase = async (ms: number) => {
  await wait(ms);
  try {
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");
  } catch (err) {
    console.error("Error during Data Source initialization:", err);
    process.exit(1);
  }
};

export default initializeDatabase;
