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

export const copyToClipboard = async (text: string) => {
	try {
		await navigator.clipboard.writeText(text);
		return null;
	} catch (error) {
		return error;
	}
};

export const downloadAsFile = (text: string) => {
	const blob = new Blob([text], { type: 'text/plain' });
	const url = URL.createObjectURL(blob);

	const link = document.createElement('a');
	link.href = url;
	link.hidden = true;
	link.download = `interview-questions-${new Date().toISOString()}.txt`;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);

	URL.revokeObjectURL(url);
};
