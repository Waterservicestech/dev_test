import "reflect-metadata";
import express from "express";
import initializeDatabase from "./database";

const app = express();
app.use(express.json());

initializeDatabase(20000).then(() => {
  app.post("/users", async (req, res) => {
    // Crie o endpoint de users
  });

  app.post("/posts", async (req, res) => {
    // Crie o endpoint de posts
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
