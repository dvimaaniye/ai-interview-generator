import { Type } from '@google/genai';

import { gemini } from './gemini.js';
import type { GenerateInterviewDto } from './types.js';

const systemPrompt =
	'You will only generate technical interview questions and optionally answers (only when asked to) based on the user data given to you. Your response MUST be in raw JSON format. DO NOT use any markdown, backticks, code block fences, or any other formatting whatsoever. Ensure that the generated questions and answers are in plain text, there must NOT be any markdown.';

export function makePrompt(data: GenerateInterviewDto) {
	return JSON.stringify(data);
}

export function generateInterview(prompt: string) {
	return gemini.models.generateContent({
		model: 'gemini-2.5-flash',
		contents: prompt,
		config: {
			thinkingConfig: {
				thinkingBudget: 0, // Disables thinking
			},
			responseMimeType: 'application/json',
			responseSchema: {
				type: Type.ARRAY,
				items: {
					type: Type.OBJECT,
					properties: {
						id: {
							type: Type.INTEGER,
						},
						question: {
							type: Type.STRING,
						},
						answer: {
							type: Type.STRING,
						},
					},
					propertyOrdering: ['id', 'question', 'answer'],
				},
			},
			systemInstruction: {
				parts: [
					{
						text: systemPrompt,
					},
				],
			},
		},
	});
}
