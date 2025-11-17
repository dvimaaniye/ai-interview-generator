import cors, { type CorsOptions } from 'cors';
import { configDotenv } from 'dotenv';
import express, { type ErrorRequestHandler, type Express } from 'express';

import router from './router.js';

configDotenv();

const app: Express = express();

const corsOptions: CorsOptions = {
	origin: process.env.CLIENT_URL,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(router);

app.use(((error, req, res, next) => {
	console.error(error.stack);

	res.status(error.status || error.statusCode || 500).json({
		message: error.message || 'Internal Server Error',
		error: error?.error,
	});
}) as ErrorRequestHandler);

export default app;
