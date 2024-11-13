import "reflect-metadata";
import express from "express";
import initializeDatabase from "./database";
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";

const app = express();
app.use(express.json());

initializeDatabase(40000).then(() => {
  app.use("/users", userRoutes);
  app.use("/posts", postRoutes);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
