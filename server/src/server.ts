import cors, { type CorsOptions } from 'cors';
import { configDotenv } from 'dotenv';
import express, { type Express } from 'express';

import router from './router.js';

configDotenv();

const app: Express = express();

const corsOptions: CorsOptions = {
	origin: process.env.CLIENT_URL,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(router);

export default app;
