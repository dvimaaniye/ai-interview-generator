import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import type { ResultsData } from '@/types/form-response';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const formatResultsAsText = (results: ResultsData) => {
	return results.map((item) => formatResultItemAsText(item)).join('\n\n');
};

export const formatResultItemAsText = (item: ResultsData[number]) => {
	let text = `Q: ${item.question}\n`;
	if (item.answer) {
		text += `\nA: ${item.answer}\n`;
	}
	return text;
};
