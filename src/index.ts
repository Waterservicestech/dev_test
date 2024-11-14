import 'reflect-metadata';
import express from 'express';
import { initializeDatabase } from './db/conn';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes)

initializeDatabase();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
