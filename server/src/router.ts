import { Router } from 'express';
import { z } from 'zod';

import { geminiModel } from './ai.js';
import { aiModelName } from './constants.js';
import { formSchema } from './types.js';
import { generateInterview, makePrompt } from './utils.js';

const router: Router = Router();
const AI_API_KEY_HEADER = 'X-AI-API-KEY';

router.get('/check', (_, res) => {
	res.send('Check');
});

router.post(
	'/generate-interview',
	async (req, res, next) => {
		if (!req.header(AI_API_KEY_HEADER)) {
			res
				.status(401)
				.json({ message: `'${AI_API_KEY_HEADER}' header not set` });
			return;
		}
		next();
	},
	async (req, res) => {
		const validationResult = formSchema.safeParse(req.body);

		if (validationResult.error) {
			console.log('Input validation failed:', validationResult.error);
			res.status(422).json({
				message: 'Input validation failed',
				error: z.treeifyError(validationResult.error),
			});
			return;
		}

		const data = validationResult.data;
		const aiModel = geminiModel(req.header('X-AI-API-KEY') || '', aiModelName);
		const prompt = makePrompt(data);
		const interview = await generateInterview(aiModel, prompt);

		if (interview.length === 0) {
			res.status(500).json({ message: 'Interview not generated' });
			return;
		}

		res.status(200).json(interview);
	},
);

export default router;
