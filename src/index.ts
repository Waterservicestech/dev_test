import express from 'express';
import { initializeDatabase } from './db/dataSource';
import routes from './routes/routes';

const app = express();
app.use(express.json());

initializeDatabase();

app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});