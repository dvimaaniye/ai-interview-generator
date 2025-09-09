import { Router } from 'express';
import { z } from 'zod';

import { formSchema } from './types.js';
import { generateInterview, makePrompt } from './utils.js';

const router: Router = Router();

router.get('/check', (_, res) => {
	res.send('Check');
});

router.post('/generate-interview', async (req, res) => {
	const validationResult = formSchema.safeParse(req.body);

	if (validationResult.error) {
		console.log('Input validation failed:', validationResult.error);
		res.status(400).json({
			message: 'Input validation failed',
			error: z.treeifyError(validationResult.error),
		});
		return;
	}

	const data = validationResult.data;
	const prompt = makePrompt(data);
	const aiResponse = await generateInterview(prompt);

	if (!aiResponse || !aiResponse.text) {
		res.status(500).json({ message: "Didn't get the AI response" });
		return;
	}

	let questions = [];

	try {
		questions = JSON.parse(aiResponse.text) || [];
	} catch (err: unknown) {
		console.error('Error parsing AI response to JSON:', err);
		res.status(500).json({
			message:
				"Couldn't parse AI response to JSON. AI output might be malformed.",
			error: err instanceof Error ? err.message : 'Unknown parsing error',
		});
		return;
	}

	res.status(200).json(questions);
});

export default router;
