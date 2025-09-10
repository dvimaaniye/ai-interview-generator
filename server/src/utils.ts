import { Type } from '@google/genai';

import { model, systemPrompt } from './constants.js';
import { gemini } from './gemini.js';
import type { GenerateInterviewDto } from './types.js';

export function makePrompt(data: GenerateInterviewDto) {
	return JSON.stringify(data);
}

export function generateInterview(prompt: string) {
	return gemini.models.generateContent({
		model: model,
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
