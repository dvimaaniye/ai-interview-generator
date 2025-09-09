import { configDotenv } from 'dotenv';
import express, { type Express } from 'express';

import router from './router.js';

configDotenv();

const app: Express = express();

app.use(express.json());
app.use(router);

export default app;
