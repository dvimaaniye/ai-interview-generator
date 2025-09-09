import type { FormData } from './types/form';

export const experienceLevels = [
	{
		label: 'Fresher',
		value: 'fresher',
	},
	{
		label: 'Mid-Level',
		value: 'midLevel',
	},
	{
		label: 'Senior',
		value: 'senior',
	},
] as const;

export const defaultFormValues: Partial<FormData> = {
	experienceLevel: 'fresher',
	technicalLanguages: '',
	numOfQuestions: 1,
	shouldGenerateAnswer: true,
	resumeText: '',
};
