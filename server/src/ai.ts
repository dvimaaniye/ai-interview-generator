import { createGoogleGenerativeAI } from '@ai-sdk/google';

export function geminiModel(apiKey: string, modelId: string) {
	return createGoogleGenerativeAI({ apiKey })(modelId);
}
