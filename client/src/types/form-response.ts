export interface QuestionResult {
	id: number;
	question: string;
	answer?: string; // Optional based on shouldGenerateAnswer
}

export type ResultsData = QuestionResult[];

export interface ValidationErrorResponse {
	message: string;
	error: {
		errors: string[];
		properties?: Record<string, { errors: string[] }>;
	};
}
