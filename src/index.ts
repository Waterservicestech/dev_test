import 'dotenv/config'
import { App } from "./app";

const server = new App().getServer;

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
