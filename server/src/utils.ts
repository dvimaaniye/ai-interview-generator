import { LanguageModel, generateObject } from 'ai';
import z from 'zod';

import { systemPrompt } from './constants.js';
import type { GenerateInterviewDto } from './types.js';

export function makePrompt(data: GenerateInterviewDto) {
	return JSON.stringify(data);
}

export async function generateInterview(model: LanguageModel, prompt: string) {
	const { object } = await generateObject({
		model,
		system: systemPrompt,
		prompt: prompt,
		output: 'array',
		schema: z.object({
			id: z.number().int(),
			question: z.string(),
			answer: z.string().optional(),
		}),
	});
	return object;
}
