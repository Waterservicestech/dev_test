import express from 'express';
import { initializeDatabase } from './database/dataSource';
import router from './Routes';


const app = express();
app.use(express.json());

app.use(router)

initializeDatabase().then(() => {
  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

}).catch((err) => {
  console.error(err);
  process.exit(1);
});

